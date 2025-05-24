
export interface ContentMetadata {
  id: string;
  name: string;
  type: string;
  lastUpdated: string;
  author: string;
  path: string;
}

// Content metadata registry
export const contentRegistry: Record<string, ContentMetadata> = {
  // Departments
  'ceo-office': {
    id: 'ceo-office',
    name: 'CEO Office',
    type: 'department',
    lastUpdated: '2025-04-01',
    author: 'Admin',
    path: '/src/data/content/departments/ceo-office.md'
  },
  'hr': {
    id: 'hr',
    name: 'Human Resources',
    type: 'department',
    lastUpdated: '2025-04-01',
    author: 'Jane Smith',
    path: '/src/data/content/departments/hr.md'
  },
  'finance': {
    id: 'finance',
    name: 'Finance',
    type: 'department',
    lastUpdated: '2025-04-01',
    author: 'Robert Thompson',
    path: '/src/data/content/departments/finance.md'
  },
  'marketing': {
    id: 'marketing',
    name: 'Marketing',
    type: 'department',
    lastUpdated: '2025-04-01',
    author: 'Jessica Brown',
    path: '/src/data/content/departments/marketing.md'
  },
  'rd1': {
    id: 'rd1',
    name: 'RD1',
    type: 'department',
    lastUpdated: '2025-04-01',
    author: 'Alex Chen',
    path: '/src/data/content/departments/rd1.md'
  },
  'rd2': {
    id: 'rd2',
    name: 'RD2',
    type: 'department',
    lastUpdated: '2025-04-01',
    author: 'Samantha Wong',
    path: '/src/data/content/departments/rd2.md'
  },
  'support': {
    id: 'support',
    name: 'Customer Support',
    type: 'department',
    lastUpdated: '2025-04-01',
    author: 'Brian Johnson',
    path: '/src/data/content/departments/support.md'
  },
  'sales': {
    id: 'sales',
    name: 'Sales',
    type: 'department',
    lastUpdated: '2025-04-01',
    author: 'Thomas Wilson',
    path: '/src/data/content/departments/sales.md'
  },
  'operations': {
    id: 'operations',
    name: 'Operations',
    type: 'department',
    lastUpdated: '2025-04-01',
    author: 'Matthew Robinson',
    path: '/src/data/content/departments/operations.md'
  },
  'itcad': {
    id: 'itcad',
    name: 'ITCAD',
    type: 'department',
    lastUpdated: '2025-04-01',
    author: 'IT Department',
    path: '/src/data/content/departments/itcad.md'
  },
  // ISO Documents
  'quality-manual': {
    id: 'quality-manual',
    name: 'ISO 9001 Quality Manual',
    type: 'iso',
    lastUpdated: '2025-04-01',
    author: 'Quality Team',
    path: '/src/data/content/iso/quality-manual.md'
  },
  'process-docs': {
    id: 'process-docs',
    name: 'Process Documentation',
    type: 'iso',
    lastUpdated: '2025-04-01',
    author: 'Quality Team',
    path: '/src/data/content/iso/process-docs.md'
  },
  'audit-procedures': {
    id: 'audit-procedures',
    name: 'Audit Procedures',
    type: 'iso',
    lastUpdated: '2025-04-01',
    author: 'Quality Team',
    path: '/src/data/content/iso/audit-procedures.md'
  },
  // Announcements
  'announcements': {
    id: 'announcements',
    name: 'Company Announcements',
    type: 'announcement',
    lastUpdated: '2025-04-01',
    author: 'HR Department',
    path: '/src/data/content/announcements.md'
  },
  // Events
  'events': {
    id: 'events',
    name: 'Upcoming Events',
    type: 'event',
    lastUpdated: '2025-04-01',
    author: 'Event Coordinator',
    path: '/src/data/content/events.md'
  }
};

// Service to load markdown content
export const contentService = {
  async getContent(contentId: string): Promise<string> {
    try {
      const response = await fetch(`/src/data/content/${contentId}.md`);
      if (!response.ok) {
        throw new Error(`Failed to load content: ${contentId}`);
      }
      return await response.text();
    } catch (error) {
      console.error('Error loading content:', error);
      return '# Content Not Found\n\nThe requested content could not be loaded.';
    }
  },

  getContentMetadata(contentId: string): ContentMetadata | null {
    return contentRegistry[contentId] || null;
  },

  getAllContent(): ContentMetadata[] {
    return Object.values(contentRegistry);
  }
};
