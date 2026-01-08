import { ProjectList } from './ProjectList';
import { Timer } from './Timer';

export function ProjectManager() {
  return (
    <div className="flex flex-col gap-6">
      <Timer />
      <ProjectList />
    </div>
  );
}
