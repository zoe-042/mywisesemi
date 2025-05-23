
// Document metadata
export interface DocumentMetadata {
  id: string;
  name: string;
  type: string;
  lastUpdated: string;
  author: string;
  path: string;
}

// Document metadata registry
export const documentRegistry: Record<string, DocumentMetadata> = {
  'financial-report': {
    id: 'financial-report',
    name: 'Q1 Financial Report',
    type: 'spreadsheet',
    lastUpdated: '2025-03-31',
    author: 'Robert Thompson',
    path: '/src/data/documents/financial-report.md'
  },
  'brand-guidelines': {
    id: 'brand-guidelines',
    name: 'Brand Guidelines 2025',
    type: 'document',
    lastUpdated: '2025-01-15',
    author: 'Jessica Brown',
    path: '/src/data/documents/brand-guidelines.md'
  },
  'employee-handbook': {
    id: 'employee-handbook',
    name: 'Employee Handbook',
    type: 'document',
    lastUpdated: '2025-02-10',
    author: 'Jane Smith',
    path: '/src/data/documents/employee-handbook.md'
  },
  'product-roadmap': {
    id: 'product-roadmap',
    name: 'Product Roadmap',
    type: 'document',
    lastUpdated: '2025-03-15',
    author: 'Christopher Taylor',
    path: '/src/data/documents/product-roadmap.md'
  },
  'marketing-assets': {
    id: 'marketing-assets',
    name: 'Marketing Assets',
    type: 'image',
    lastUpdated: '2025-03-20',
    author: 'Daniel White',
    path: '/src/data/documents/marketing-assets.md'
  },
  'project-template': {
    id: 'project-template',
    name: 'Project Proposal Template',
    type: 'document',
    lastUpdated: '2025-01-30',
    author: 'Matthew Robinson',
    path: '/src/data/documents/project-template.md'
  },
  'it-faq': {
    id: 'it-faq',
    name: 'IT FAQ',
    type: 'faq',
    lastUpdated: '2025-04-05',
    author: 'IT Department',
    path: '/src/data/documents/it-faq.md'
  },
  'new-employee-guide': {
    id: 'new-employee-guide',
    name: 'New Employee Guide',
    type: 'guide',
    lastUpdated: '2025-03-25',
    author: 'HR Department',
    path: '/src/data/documents/new-employee-guide.md'
  }
};

// Service to load markdown content
export const documentService = {
  async getDocumentContent(docId: string): Promise<string> {
    try {
      const response = await fetch(`/src/data/documents/${docId}.md`);
      if (!response.ok) {
        throw new Error(`Failed to load document: ${docId}`);
      }
      return await response.text();
    } catch (error) {
      console.error('Error loading document:', error);
      return '# Document Not Found\n\nThe requested document could not be loaded.';
    }
  },

  getDocumentMetadata(docId: string): DocumentMetadata | null {
    return documentRegistry[docId] || null;
  },

  getAllDocuments(): DocumentMetadata[] {
    return Object.values(documentRegistry);
  }
};
