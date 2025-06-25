// types/experience.ts
interface RichTextNode {
  type: string;
  format?: string;
  children?: RichTextNode[];
  text?: string;
}

export interface CompanyLogo {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: string | null;
      size: number;
      width: number;
      height: number;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown;
  folderPath: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

export interface Experience {
  company: string;
  role: string;
  start_date: Date | string;
  end_date: Date | string;
  description: string | RichTextNode[]; // Support both string and rich text
  link?: string;
  company_logo?: CompanyLogo;
  order_number: number;
}
