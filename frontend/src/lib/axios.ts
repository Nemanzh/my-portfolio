import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { toast } from 'sonner';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    metadata?: {
      startTime: number;
    };
    _retry?: boolean;
  }
}

export const api = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

let activeRequests = 0;

const setLoading = (isLoading: boolean) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('api-loading', { detail: isLoading }));
  }
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    activeRequests++;
    setLoading(true);

    config.metadata = { startTime: Date.now() };

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`,
        {
          params: config.params,
          data: config.data,
        }
      );
    }

    const token =
      typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    activeRequests--;
    if (activeRequests === 0) setLoading(false);

    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

interface ErrorResponseData {
  message?: string;
  [key: string]: unknown;
}

api.interceptors.response.use(
  (response: AxiosResponse) => {
    activeRequests--;
    if (activeRequests === 0) setLoading(false);

    const duration = Date.now() - (response.config.metadata?.startTime || 0);

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `✅ API Response: ${response.config.method?.toUpperCase()} ${
          response.config.url
        }`,
        {
          status: response.status,
          duration: `${duration}ms`,
          data: response.data,
        }
      );
    }

    if (duration > 3000) {
      console.warn(
        `⚠️ Slow API request detected: ${duration}ms for ${response.config.url}`
      );
    }

    return response;
  },
  async (error: AxiosError) => {
    activeRequests--;
    if (activeRequests === 0) setLoading(false);

    const originalRequest = error.config as InternalAxiosRequestConfig;

    if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout. Please check your connection.');
      console.error('⏰ Request timeout:', error.config?.url);
    } else if (error.response?.status === 404) {
      console.warn('🔍 Resource not found:', error.config?.url);

      if (!originalRequest?._retry && originalRequest) {
        originalRequest._retry = true;
        console.log('🔄 Retrying request after 404...');

        await new Promise((resolve) => setTimeout(resolve, 2000));
        return api(originalRequest);
      }
    } else if (error.response?.status === 500) {
      toast.error('Server error. Please try again later.');
      console.error('💥 Server error:', error.response.data);
    } else if (
      error.response?.status &&
      error.response.status >= 400 &&
      error.response.status < 500
    ) {
      const data = error.response.data as ErrorResponseData;
      const message = data?.message || 'Something went wrong';
      toast.error(message);
      console.error('❌ Client error:', error.response.data);
    } else if (typeof navigator !== 'undefined' && !navigator.onLine) {
      toast.error('No internet connection. Please check your network.');
      console.error('🌐 Network offline');
    } else {
      toast.error('Network error. Please try again.');
      console.error('🚨 Unknown error:', error);
    }

    return Promise.reject(error);
  }
);

export const checkApiHealth = async (): Promise<boolean> => {
  try {
    await api.get('/api/health', { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
};

export default api;
