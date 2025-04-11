
import { 
  departments, 
  projects, 
  isoDocuments, 
  announcements, 
  events, 
  documents, 
  dailyTools 
} from '../data/mockData';
import { Department, Project, ISODocument, Announcement, Event, Document, DailyTool } from '../types';

// Simulate API delay for a more realistic experience
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generic error for simulating API failures
class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Departments API
export const departmentsApi = {
  getAll: async (): Promise<Department[]> => {
    await delay(300); // Simulate network delay
    return [...departments];
  },
  
  getById: async (id: number): Promise<Department | null> => {
    await delay(200);
    const department = departments.find(d => d.id === id);
    if (!department) return null;
    return { ...department };
  }
};

// Projects API
export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    await delay(300);
    return [...projects];
  },
  
  getById: async (id: number): Promise<Project | null> => {
    await delay(200);
    const project = projects.find(p => p.id === id);
    if (!project) return null;
    return { ...project };
  }
};

// ISO Documents API
export const isoDocumentsApi = {
  getAll: async (): Promise<ISODocument[]> => {
    await delay(300);
    return [...isoDocuments];
  },
  
  getById: async (id: number): Promise<ISODocument | null> => {
    await delay(200);
    const doc = isoDocuments.find(d => d.id === id);
    if (!doc) return null;
    return { ...doc };
  }
};

// Announcements API
export const announcementsApi = {
  getAll: async (): Promise<Announcement[]> => {
    await delay(400);
    return [...announcements];
  },
  
  getById: async (id: number): Promise<Announcement | null> => {
    await delay(200);
    const announcement = announcements.find(a => a.id === id);
    if (!announcement) return null;
    return { ...announcement };
  },
  
  create: async (announcement: Omit<Announcement, 'id'>): Promise<Announcement> => {
    await delay(500);
    const newId = Math.max(...announcements.map(a => a.id), 0) + 1;
    const newAnnouncement = { id: newId, ...announcement };
    announcements.push(newAnnouncement);
    return { ...newAnnouncement };
  },
  
  update: async (id: number, data: Partial<Announcement>): Promise<Announcement> => {
    await delay(500);
    const index = announcements.findIndex(a => a.id === id);
    if (index === -1) throw new ApiError('Announcement not found', 404);
    
    announcements[index] = { ...announcements[index], ...data };
    return { ...announcements[index] };
  },
  
  delete: async (id: number): Promise<void> => {
    await delay(500);
    const index = announcements.findIndex(a => a.id === id);
    if (index === -1) throw new ApiError('Announcement not found', 404);
    
    announcements.splice(index, 1);
  }
};

// Events API
export const eventsApi = {
  getAll: async (): Promise<Event[]> => {
    await delay(400);
    return [...events];
  },
  
  getById: async (id: number): Promise<Event | null> => {
    await delay(200);
    const event = events.find(e => e.id === id);
    if (!event) return null;
    return { ...event };
  },
  
  create: async (event: Omit<Event, 'id'>): Promise<Event> => {
    await delay(500);
    const newId = Math.max(...events.map(e => e.id), 0) + 1;
    const newEvent = { id: newId, ...event };
    events.push(newEvent);
    return { ...newEvent };
  },
  
  update: async (id: number, data: Partial<Event>): Promise<Event> => {
    await delay(500);
    const index = events.findIndex(e => e.id === id);
    if (index === -1) throw new ApiError('Event not found', 404);
    
    events[index] = { ...events[index], ...data };
    return { ...events[index] };
  },
  
  delete: async (id: number): Promise<void> => {
    await delay(500);
    const index = events.findIndex(e => e.id === id);
    if (index === -1) throw new ApiError('Event not found', 404);
    
    events.splice(index, 1);
  }
};

// Documents API
export const documentsApi = {
  getAll: async (): Promise<Document[]> => {
    await delay(400);
    return [...documents];
  },
  
  getById: async (id: number): Promise<Document | null> => {
    await delay(200);
    const document = documents.find(d => d.id === id);
    if (!document) return null;
    return { ...document };
  }
};

// Daily Tools API
export const dailyToolsApi = {
  getAll: async (): Promise<DailyTool[]> => {
    await delay(300);
    return [...dailyTools];
  },
  
  getById: async (id: number): Promise<DailyTool | null> => {
    await delay(200);
    const tool = dailyTools.find(t => t.id === id);
    if (!tool) return null;
    return { ...tool };
  }
};
