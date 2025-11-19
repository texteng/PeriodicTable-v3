import './App.css';
import { AppProvider } from './contexts/AppContext';
import AppContent from './AppContent';

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
