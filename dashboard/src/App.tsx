import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Header } from './layout/header/Header';
import { Router } from './routes/Router';
import { useHeight } from './hooks/useHeight';
import { useEffect, useRef } from 'react';
import { LogInModal } from './layout/modal/LogInModal';
import { SignInModal } from './layout/modal/SignInModal';
import { setUser } from './state/user';
import { useNavigate } from 'react-router-dom';
import { CreateLocationModal } from './layout/modal/CreateLocationModal';
import Toasts from './components/toasts/Toasts';

const theme = createTheme();

function App() {
  const ref = useRef<HTMLElement | null>(null);
  const height = useHeight(ref);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUser({ id: userId });
      navigate('/locations');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header ref={ref} />
      <LogInModal />
      <SignInModal />
      <CreateLocationModal />
      <Toasts />

      <div style={{ height: `calc(100% - ${height}px)`, position: 'relative' }}>
        <Router />
      </div>
    </ThemeProvider>
  );
}

export default App;
