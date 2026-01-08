export interface Project {
  id: string;
  name: string;
  createdAt: string;
}

export interface TimeLog {
  id: string;
  projectId: string;
  startTime: string;
  endTime: string;
  duration: number; // in seconds
}
