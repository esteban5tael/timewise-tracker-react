const API_BASE_URL = 'http://localhost:3001';

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
  duration: number;
}

export interface AppData {
  activeProjectId: string | null;
}

// Projects API
export async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${API_BASE_URL}/projects`);
  if (!response.ok) throw new Error('Error fetching projects');
  return response.json();
}

export async function createProject(project: Omit<Project, 'id'>): Promise<Project> {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });
  if (!response.ok) throw new Error('Error creating project');
  return response.json();
}

export async function updateProject(id: string, project: Partial<Project>): Promise<Project> {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });
  if (!response.ok) throw new Error('Error updating project');
  return response.json();
}

export async function deleteProject(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error deleting project');
}

// TimeLogs API
export async function getTimeLogs(): Promise<TimeLog[]> {
  const response = await fetch(`${API_BASE_URL}/timeLogs`);
  if (!response.ok) throw new Error('Error fetching time logs');
  return response.json();
}

export async function createTimeLog(timeLog: Omit<TimeLog, 'id'>): Promise<TimeLog> {
  const response = await fetch(`${API_BASE_URL}/timeLogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(timeLog),
  });
  if (!response.ok) throw new Error('Error creating time log');
  return response.json();
}

export async function updateTimeLog(id: string, timeLog: Partial<TimeLog>): Promise<TimeLog> {
  const response = await fetch(`${API_BASE_URL}/timeLogs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(timeLog),
  });
  if (!response.ok) throw new Error('Error updating time log');
  return response.json();
}

export async function deleteTimeLog(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/timeLogs/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error deleting time log');
}

// AppData API
export async function getAppData(): Promise<AppData> {
  const response = await fetch(`${API_BASE_URL}/appData`);
  if (!response.ok) throw new Error('Error fetching app data');
  const data = await response.json();
  // json-server devuelve un array, tomamos el primer elemento
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }
  return { activeProjectId: null };
}

export async function updateAppData(appData: AppData): Promise<AppData> {
  // Primero obtenemos el ID existente
  const current = await getAppData();
  const id = (current as any).id || '1';
  
  const response = await fetch(`${API_BASE_URL}/appData/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...appData }),
  });
  if (!response.ok) throw new Error('Error updating app data');
  const updated = await response.json();
  return { activeProjectId: updated.activeProjectId };
}
