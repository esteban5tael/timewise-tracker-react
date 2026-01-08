import { useMemo } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Project } from '@/lib/types';
import { formatTotalHours } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface ProjectReportProps {
  projects: Project[];
}

export function ProjectReport({ projects }: ProjectReportProps) {
  const { timeLogs } = useAppContext();

  const reportData = useMemo(() => {
    return projects.map(project => {
      const projectLogs = timeLogs.filter(log => log.projectId === project.id);
      const totalDuration = projectLogs.reduce((acc, log) => acc + log.duration, 0);

      const dailyLogs: { [date: string]: number } = {};
      projectLogs.forEach(log => {
        const date = new Date(log.startTime).toLocaleDateString();
        if (!dailyLogs[date]) {
          dailyLogs[date] = 0;
        }
        dailyLogs[date] += log.duration;
      });

      const dailySummaries = Object.entries(dailyLogs).map(([date, duration]) => ({
        date,
        duration,
      })).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      return {
        ...project,
        totalDuration,
        dailySummaries,
      };
    }).sort((a,b) => b.totalDuration - a.totalDuration);
  }, [projects, timeLogs]);

  if (reportData.length === 0) {
    return <div className="text-center text-muted-foreground pt-8">No time logged for the selected project(s).</div>;
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {reportData.map(project => (
        <AccordionItem value={project.id} key={project.id}>
          <AccordionTrigger>
            <div className="flex justify-between w-full pr-4">
              <span className="font-semibold">{project.name}</span>
              <span className="text-muted-foreground">{formatTotalHours(project.totalDuration)}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {project.dailySummaries.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Total Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {project.dailySummaries.map(summary => (
                        <TableRow key={summary.date}>
                            <TableCell>{summary.date}</TableCell>
                            <TableCell className="text-right font-mono">{formatTotalHours(summary.duration)}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p className='text-sm text-muted-foreground px-4 py-2'>No time logged for this project yet.</p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
