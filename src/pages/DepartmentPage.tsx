
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { contentService, ContentMetadata } from '@/services/contentService';
import { useLanguage } from '@/contexts/LanguageContext';

const DepartmentPage = () => {
  const { deptId } = useParams<{ deptId: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [content, setContent] = useState<string>('');
  const [metadata, setMetadata] = useState<ContentMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadDepartment = async () => {
      if (!deptId) return;
      
      setLoading(true);
      const contentMetadata = contentService.getContentMetadata(deptId);
      let departmentContent = '';
      
      if (contentMetadata) {
        departmentContent = await contentService.getContent(`departments/${deptId}`);
      } else {
        // Fallback content for departments without markdown files
        departmentContent = `# ${t(`dept.${deptId}`)}\n\nDepartment information will be available soon.`;
      }
      
      setMetadata(contentMetadata);
      setContent(departmentContent);
      setLoading(false);
    };
    
    loadDepartment();
  }, [deptId, t]);
  
  if (!deptId) {
    return (
      <div className="p-6">
        <h1>Department not found</h1>
        <Button onClick={() => navigate('/')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </div>
    );
  }
  
  // Simple markdown rendering for demonstration
  const renderMarkdown = (markdown: string) => {
    const lines = markdown.split('\n');
    return (
      <div className="markdown">
        {lines.map((line, index) => {
          if (line.startsWith('# ')) {
            return <h1 key={index} className="text-2xl font-bold mb-4">{line.substring(2)}</h1>;
          } else if (line.startsWith('## ')) {
            return <h2 key={index} className="text-xl font-semibold mt-6 mb-3">{line.substring(3)}</h2>;
          } else if (line.startsWith('### ')) {
            return <h3 key={index} className="text-lg font-semibold mt-4 mb-2">{line.substring(4)}</h3>;
          } else if (line.startsWith('- ')) {
            return <li key={index} className="ml-6 mb-1">{line.substring(2)}</li>;
          } else if (line === '') {
            return <p key={index} className="my-2"></p>;
          } else {
            return <p key={index} className="mb-2">{line}</p>;
          }
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6 w-32"></div>
          <div className="bg-gray-200 rounded-lg h-96"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Button variant="outline" onClick={() => navigate('/')} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Button>
      
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle>{metadata?.name || t(`dept.${deptId}`)}</CardTitle>
          {metadata && (
            <div className="text-sm text-gray-500 mt-1">
              Last updated: {metadata.lastUpdated} • Author: {metadata.author}
            </div>
          )}
        </CardHeader>
        <CardContent className="pt-6">
          {renderMarkdown(content)}
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentPage;
