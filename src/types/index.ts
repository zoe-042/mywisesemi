
export interface Department {
  id: number;
  name: string;
  path: string;
}

export interface Project {
  id: number;
  name: string;
  path: string;
}

export interface ISODocument {
  id: number;
  name: string;
  path: string;
}

export interface Announcement {
  id: number;
  title: string;
  description: string;
  date: string;
  important: boolean;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
}

export interface Document {
  id: number;
  name: string;
  type: string;
  path: string;
}

export interface DailyTool {
  id: number;
  name: string;
  type: string;
  path: string;
}
