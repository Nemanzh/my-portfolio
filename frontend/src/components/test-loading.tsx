// src/components/test-loading.tsx
'use client';

import { Button } from '@/components/ui/button';
import { getSkills, getEducation, getExperience } from '@/lib/api';
import { api } from '@/lib/axios';
import { useLocale } from 'next-intl';
import { useState } from 'react';

export function TestLoading() {
  const locale = useLocale();
  const [testResult, setTestResult] = useState<string>('');

  const testApiCall = async () => {
    try {
      setTestResult('Testing...');
      const skills = await getSkills();
      setTestResult(`✅ Success: Loaded ${skills.length} skills`);
    } catch (error) {
      setTestResult(`❌ Error: ${error}`);
    }
  };

  const testSlowApiCall = async () => {
    try {
      setTestResult('Testing slow API...');
      await api.get('/api/skills?delay=3000');
      setTestResult(`✅ Slow API completed`);
    } catch (error) {
      setTestResult(`❌ Error: ${error}`);
    }
  };

  const testMultipleApiCalls = async () => {
    try {
      setTestResult('Testing multiple APIs...');
      const [skills, education, experience] = await Promise.all([
        getSkills(),
        getEducation(locale),
        getExperience(locale),
      ]);
      setTestResult(
        `✅ Multiple APIs: ${skills.length} skills, ${education.length} education, ${experience.length} experience`
      );
    } catch (error) {
      setTestResult(`❌ Error: ${error}`);
    }
  };

  const testFailingApiCall = async () => {
    try {
      setTestResult('Testing failing API...');
      await api.get('/api/nonexistent-endpoint');
    } catch (error) {
      setTestResult(`❌ Expected error: ${error}`);
    }
  };

  const testTimeoutCall = async () => {
    try {
      setTestResult('Testing timeout...');
      await api.get('/api/skills', { timeout: 1 });
    } catch (error) {
      setTestResult(`❌ Timeout error: ${error}`);
    }
  };

  const testRetryCall = async () => {
    try {
      setTestResult('Testing retry mechanism...');
      await api.get('/api/might-not-exist');
    } catch (error) {
      setTestResult(`❌ Retry error: ${error}`);
    }
  };

  const testManualLoading = () => {
    setTestResult('Testing manual loading...');

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('api-loading', { detail: true }));

      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('api-loading', { detail: false }));
        setTestResult('✅ Manual loading completed');
      }, 3000);
    }
  };

  const testConcurrentCalls = async () => {
    try {
      setTestResult('Testing concurrent calls...');
      const promises = [
        api.get('/api/skills?populate=icon'),
        api.get(`/api/educations?locale=${locale}`),
        api.get(`/api/experiences?locale=${locale}`),
        api.get(`/api/about?locale=${locale}`),
        api.get(`/api/contact?locale=${locale}`),
      ];

      const results = await Promise.allSettled(promises);
      const successful = results.filter((r) => r.status === 'fulfilled').length;
      const failed = results.filter((r) => r.status === 'rejected').length;

      setTestResult(`✅ Concurrent: ${successful} success, ${failed} failed`);
    } catch (error) {
      setTestResult(`❌ Concurrent error: ${error}`);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 bg-background/90 backdrop-blur-sm border rounded-lg p-4 space-y-2 max-w-xs">
      <h3 className="text-sm font-semibold">Loading Bar Tests</h3>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        <Button size="sm" onClick={testApiCall} className="w-full text-xs">
          Test Normal API
        </Button>

        <Button size="sm" onClick={testSlowApiCall} className="w-full text-xs">
          Test Slow API (3s)
        </Button>

        <Button
          size="sm"
          onClick={testMultipleApiCalls}
          className="w-full text-xs"
        >
          Test Multiple APIs
        </Button>

        <Button
          size="sm"
          onClick={testConcurrentCalls}
          className="w-full text-xs"
        >
          Test Concurrent APIs
        </Button>

        <Button
          size="sm"
          onClick={testFailingApiCall}
          variant="destructive"
          className="w-full text-xs"
        >
          Test Failing API
        </Button>

        <Button
          size="sm"
          onClick={testTimeoutCall}
          variant="destructive"
          className="w-full text-xs"
        >
          Test Timeout
        </Button>

        <Button
          size="sm"
          onClick={testRetryCall}
          variant="secondary"
          className="w-full text-xs"
        >
          Test Retry Logic
        </Button>

        <Button
          size="sm"
          onClick={testManualLoading}
          variant="outline"
          className="w-full text-xs"
        >
          Test Manual Loading
        </Button>
      </div>

      {testResult && (
        <div className="text-xs p-2 bg-muted rounded text-muted-foreground max-h-20 overflow-y-auto">
          {testResult}
        </div>
      )}
    </div>
  );
}
