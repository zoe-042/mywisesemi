
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DocumentPage = () => {
  const { docId } = useParams<{ docId: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState<string>('');
  
  useEffect(() => {
    const loadDocument = async () => {
      if (!docId) return;
      
      setLoading(true);
      
      try {
        let filePath = '';
        let documentTitle = '';
        
        // Determine the correct file path based on the document ID
        if (docId === 'employee-activities') {
          filePath = '/data/life/employee-activities.md';
          documentTitle = 'Employee Activities / 員工活動';
        } else if (docId === 'company-dining') {
          filePath = '/data/life/company-dining.md';
          documentTitle = 'Company Dining / 公司聚餐';
        } else if (docId === 'team-building') {
          filePath = '/data/life/team-building.md';
          documentTitle = 'Team Building / 團隊建設';
        } else if (docId === 'work-life-balance') {
          filePath = '/data/life/work-life-balance.md';
          documentTitle = 'Work Life Balance / 工作生活平衡';
        } else if (docId === 'photo-gallery') {
          filePath = '/data/life/photo-gallery.md';
          documentTitle = 'Photo Gallery / 員工相簿';
        } else {
          // For other documents, try the documents folder
          filePath = `/data/documents/${docId}.md`;
          documentTitle = docId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        }
        
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to load document: ${docId}`);
        }
        const markdownContent = await response.text();
        
        setContent(markdownContent);
        setTitle(documentTitle);
      } catch (error) {
        console.error('Error loading document:', error);
        setContent('# Document Not Found\n\nThe requested document could not be loaded.');
        setTitle('Document Not Found');
      }
      
      setLoading(false);
    };
    
    loadDocument();
  }, [docId]);
  
  if (!docId) {
    return (
      <div className="p-6">
        <h1>Document not found</h1>
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
          } else if (line.startsWith('**') && line.endsWith('**')) {
            return <p key={index} className="font-semibold mb-2">{line.substring(2, line.length - 2)}</p>;
          } else if (line.startsWith('- [ ] ')) {
            return (
              <div key={index} className="flex items-start ml-6 mb-1">
                <div className="border border-gray-300 rounded w-4 h-4 mt-1 mr-2"></div>
                <span>{line.substring(6)}</span>
              </div>
            );
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
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{title}</CardTitle>
              <div className="text-sm text-gray-500 mt-1">
                Document ID: {docId}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" /> Download
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" /> Share
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {renderMarkdown(content)}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentPage;
