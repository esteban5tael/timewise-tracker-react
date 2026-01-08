import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
} from "react";
import { Project, TimeLog } from "@/lib/types";
import { generateId } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import * as api from "@/lib/api";

interface AppContextType {
    projects: Project[];
    addProject: (name: string) => Promise<void>;
    timeLogs: TimeLog[];
    addTimeLog: (log: Omit<TimeLog, "id" | "endTime">) => Promise<void>;
    activeProjectId: string | null;
    setActiveProjectId: (id: string | null) => Promise<void>;
    timerRunning: boolean;
    setTimerRunning: (running: boolean) => void;
    startTime: number | null;
    setStartTime: (time: number | null) => void;
    elapsedTime: number;
    isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(
    undefined
);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [timeLogs, setTimeLogs] = useState<TimeLog[]>([]);
    const [activeProjectId, setActiveProjectIdState] = useState<
        string | null
    >(null);
    const [timerRunning, setTimerRunning] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    // Cargar datos del json-server al iniciar
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const [projectsData, timeLogsData, appData] = await Promise.all([
                    api.getProjects(),
                    api.getTimeLogs(),
                    api.getAppData(),
                ]);
                setProjects(projectsData);
                setTimeLogs(timeLogsData);
                setActiveProjectIdState(appData.activeProjectId || null);
            } catch (error) {
                console.error("Error loading data:", error);
                toast({
                    title: "Error",
                    description: "No se pudieron cargar los datos.",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [toast]);

    // Funciones para actualizar estado y persistir
    const addProject = useCallback(
        async (name: string) => {
            try {
                const newProject: Project = {
                    id: generateId(),
                    name,
                    createdAt: new Date().toISOString(),
                };
                const createdProject = await api.createProject(newProject);
                setProjects((prev) => [...prev, createdProject]);
                toast({
                    title: "Proyecto Creado",
                    description: `El proyecto "${name}" ha sido creado exitosamente.`,
                });
            } catch (error) {
                console.error("Error creating project:", error);
                toast({
                    title: "Error",
                    description: "No se pudo crear el proyecto.",
                    variant: "destructive",
                });
            }
        },
        [toast]
    );

    const addTimeLog = useCallback(
        async (log: Omit<TimeLog, "id" | "endTime">) => {
            try {
                const newLog: TimeLog = {
                    ...log,
                    id: generateId(),
                    endTime: new Date().toISOString(),
                };
                const createdLog = await api.createTimeLog(newLog);
                setTimeLogs((prev) => [...prev, createdLog]);
                toast({
                    title: "Tiempo Registrado",
                    description: "Tu sesión de trabajo ha sido guardada.",
                });
            } catch (error) {
                console.error("Error creating time log:", error);
                toast({
                    title: "Error",
                    description: "No se pudo guardar el registro de tiempo.",
                    variant: "destructive",
                });
            }
        },
        [toast]
    );

    const setActiveProjectId = useCallback(
        async (id: string | null) => {
            try {
                setActiveProjectIdState(id);
                await api.updateAppData({ activeProjectId: id });
            } catch (error) {
                console.error("Error updating active project:", error);
                toast({
                    title: "Error",
                    description: "No se pudo actualizar el proyecto activo.",
                    variant: "destructive",
                });
            }
        },
        [toast]
    );

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (timerRunning && startTime) {
            interval = setInterval(() => {
                setElapsedTime((Date.now() - startTime) / 1000);
            }, 1000);
        } else if (!timerRunning) {
            if (interval) clearInterval(interval);
            setElapsedTime(0);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timerRunning, startTime]);

    const contextValue: AppContextType = {
        projects,
        addProject,
        timeLogs,
        addTimeLog,
        activeProjectId,
        setActiveProjectId,
        timerRunning,
        setTimerRunning,
        startTime,
        setStartTime,
        elapsedTime,
        isLoading,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error(
            "useAppContext must be used within an AppProvider"
        );
    }
    return context;
};
