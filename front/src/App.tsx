import { Dashboard } from './components/Dashboard';
import { AppProvider } from './context/AppContext';
import { Clock } from 'lucide-react';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <AppProvider>
      <main className="container mx-auto p-4 md:p-8">
        <header className="mb-8 flex items-center gap-3">
          <Clock className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">TimeWise Track</h1>
        </header>
        <Dashboard />
      </main>
      <Toaster />
    </AppProvider>
  );
}

export default App;
