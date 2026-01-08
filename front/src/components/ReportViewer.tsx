import { useState, useMemo } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ProjectReport } from './ProjectReport';
import { LineChart } from 'lucide-react';

export function ReportViewer() {
  const { projects } = useAppContext();
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = useMemo(() => {
    if (filter === 'all') {
      return projects;
    }
    return projects.filter(p => p.id === filter);
  }, [filter, projects]);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Reports</CardTitle>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            {projects.map(project => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {projects.length > 0 ? (
          <ProjectReport projects={filteredProjects} />
        ) : (
          <div className="text-center text-muted-foreground py-10">
            <LineChart className="mx-auto h-12 w-12" />
            <p className="mt-2">No data to report yet.</p>
            <p>Start tracking time to see your reports.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
