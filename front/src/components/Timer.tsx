import { useAppContext } from '@/context/AppContext';
import { Play, Square } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { formatDuration } from '@/lib/utils';
import { useMemo } from 'react';

export function Timer() {
  const {
    activeProjectId,
    projects,
    timerRunning,
    setTimerRunning,
    setStartTime,
    startTime,
    elapsedTime,
    addTimeLog,
  } = useAppContext();

  const activeProject = useMemo(() => {
    return projects.find(p => p.id === activeProjectId);
  }, [projects, activeProjectId]);

  const handleStart = () => {
    if (!activeProjectId) return;
    setStartTime(Date.now());
    setTimerRunning(true);
  };

  const handleStop = async () => {
    if (!activeProjectId || !startTime) return;
    await addTimeLog({
      projectId: activeProjectId,
      startTime: new Date(startTime).toISOString(),
      duration: elapsedTime,
    });
    setTimerRunning(false);
    setStartTime(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Active Session</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Current Project</p>
          <p className="text-xl font-semibold h-7">
            {activeProject ? activeProject.name : 'No project selected'}
          </p>
        </div>

        <div className="font-mono text-6xl text-center p-4 rounded-lg bg-secondary w-full">
          {formatDuration(elapsedTime)}
        </div>
        
        <div className="flex w-full gap-4">
          <Button
            onClick={handleStart}
            disabled={!activeProjectId || timerRunning}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            aria-label="Start timer"
          >
            <Play className="mr-2 h-5 w-5" /> Start
          </Button>
          <Button
            onClick={handleStop}
            disabled={!timerRunning}
            variant="destructive"
            className="w-full"
            aria-label="Stop timer"
          >
            <Square className="mr-2 h-5 w-5" /> Stop
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
