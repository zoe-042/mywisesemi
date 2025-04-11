
import { Department, Project, ISODocument, Announcement, Event, Document, DailyTool } from "../types";

export const departments: Department[] = [
  { id: 1, name: 'CEO Office', path: '/departments/ceo-office' },
  { id: 2, name: 'Human Resources', path: '/departments/hr' },
  { id: 3, name: 'Finance', path: '/departments/finance' },
  { id: 4, name: 'Marketing', path: '/departments/marketing' },
  { id: 5, name: 'RD1', path: '/departments/rd1' },
  { id: 6, name: 'RD2', path: '/departments/rd2' },
  { id: 7, name: 'Customer Support', path: '/departments/support' },
  { id: 8, name: 'Sales', path: '/departments/sales' },
  { id: 9, name: 'Operations', path: '/departments/operations' },
];

export const projects: Project[] = [
  { id: 1, name: 'Project_X', path: '/projects/project-x' },
  { id: 2, name: 'Project_U', path: '/projects/project-u' },
  { id: 3, name: 'Project_T', path: '/projects/project-t' },
];

export const isoDocuments: ISODocument[] = [
  { id: 1, name: 'ISO 9001 Quality Manual', path: '/projects/iso/quality-manual' },
  { id: 2, name: 'Process Documentation', path: '/projects/iso/process-docs' },
  { id: 3, name: 'Audit Procedures', path: '/projects/iso/audit-procedures' },
];

export const announcements: Announcement[] = [
  {
    id: 1,
    title: 'New Company Policy Update',
    description: 'Please review the updated remote work policy before the end of the month.',
    date: '2025-04-05',
    important: true,
  },
  {
    id: 2,
    title: 'Quarterly All-Hands Meeting',
    description: 'Join us for our Q2 all-hands meeting next Friday at 2pm in the main conference room.',
    date: '2025-04-15',
    important: true,
  },
  {
    id: 3,
    title: 'IT System Maintenance',
    description: 'The IT systems will be down for maintenance this Saturday from 10pm to 2am.',
    date: '2025-04-12',
    important: false,
  }
];

export const events: Event[] = [
  { id: 1, title: 'Product Launch Meeting', date: '2025-04-12', time: '10:00 AM', location: 'Conference Room A' },
  { id: 2, title: 'Team Building Event', date: '2025-04-15', time: '2:00 PM', location: 'Central Park' },
  { id: 3, title: 'Fiscal Year Planning', date: '2025-04-20', time: '9:00 AM', location: 'Board Room' },
  { id: 4, title: 'Employee Training', date: '2025-04-22', time: '11:00 AM', location: 'Training Center' },
];

export const documents: Document[] = [
  { id: 1, name: 'Q1 Financial Report', type: 'spreadsheet', path: '/documents/financial-report' },
  { id: 2, name: 'Brand Guidelines 2025', type: 'document', path: '/documents/brand-guidelines' },
  { id: 3, name: 'Employee Handbook', type: 'document', path: '/documents/employee-handbook' },
  { id: 4, name: 'Product Roadmap', type: 'document', path: '/documents/product-roadmap' },
  { id: 5, name: 'Marketing Assets', type: 'image', path: '/documents/marketing-assets' },
  { id: 6, name: 'Project Proposal Template', type: 'document', path: '/documents/project-template' },
  { id: 7, name: 'IT FAQ', type: 'faq', path: '/documents/it-faq' },
  { id: 8, name: 'New Employee Guide', type: 'guide', path: '/documents/new-employee-guide' },
];

export const dailyTools: DailyTool[] = [
  { id: 1, name: 'Lunch Box Selection', type: 'lunch', path: '/tools/lunch-box' },
  { id: 2, name: 'Personal Leave Management', type: 'leave', path: '/tools/leave-management' },
];
