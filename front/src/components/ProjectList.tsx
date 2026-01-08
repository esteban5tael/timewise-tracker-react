import { useAppContext } from '@/context/AppContext';
import { FolderKanban, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { CreateProjectDialog } from './CreateProjectDialog';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function ProjectList() {
  const { projects, activeProjectId, setActiveProjectId } = useAppContext();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Projects</CardTitle>
        <CreateProjectDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button variant="ghost" size="icon" onClick={() => setDialogOpen(true)}>
            <Plus className="h-5 w-5" />
            <span className="sr-only">Create new project</span>
          </Button>
        </CreateProjectDialog>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          <div className="flex flex-col gap-2 pr-4">
            {projects.length === 0 ? (
              <div className="text-center text-muted-foreground py-10">
                <FolderKanban className="mx-auto h-12 w-12" />
                <p className="mt-2">No projects yet.</p>
                <p>Create one to start tracking.</p>
              </div>
            ) : (
              projects.map(project => (
                <button
                  key={project.id}
                  onClick={() => setActiveProjectId(project.id)}
                  className={cn(
                    'w-full text-left p-3 rounded-lg transition-colors',
                    activeProjectId === project.id
                      ? 'bg-primary/20 text-primary-foreground font-semibold'
                      : 'hover:bg-secondary'
                  )}
                >
                  {project.name}
                </button>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
