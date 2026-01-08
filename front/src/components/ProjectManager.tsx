import { ProjectList } from './ProjectList';
import { Timer } from './Timer';
import { Card, CardContent } from './ui/card';

export function ProjectManager() {
  return (
    <div className="flex flex-col gap-6">
      <Timer />
      <ProjectList />
    </div>
  );
}
