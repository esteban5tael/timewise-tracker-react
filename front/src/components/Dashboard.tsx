import { ProjectManager } from './ProjectManager';
import { ReportViewer } from './ReportViewer';

export function Dashboard() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <ProjectManager />
      </div>
      <div className="lg:col-span-2">
        <ReportViewer />
      </div>
    </div>
  );
}
