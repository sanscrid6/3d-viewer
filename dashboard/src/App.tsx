import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Header } from './layout/header/Header';
import { Router } from './routes/Router';
import { useHeight } from './hooks/useHeight';
import { useEffect, useRef } from 'react';
import { LogInModal } from './layout/modal/LogInModal';
import { SignInModal } from './layout/modal/SignInModal';
import { getUserFx, setUser } from './state/user';
import { useNavigate } from 'react-router-dom';
import { CreateLocationModal } from './layout/modal/CreateLocationModal';
import Toasts from './components/toasts/Toasts';
import { WagmiConfig, createConfig } from 'wagmi';
import { goerli } from 'wagmi/chains';
import { createPublicClient, http } from 'viem';
import { PaymentModal } from './layout/modal/PaymentModal';

const theme = createTheme();

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: goerli,
    transport: http(),
  }),
});

function App() {
  const ref = useRef<HTMLElement | null>(null);
  const height = useHeight(ref);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      getUserFx({ id: userId });
      setInterval(() => {
        getUserFx({ id: userId });
      }, 10_000);
      navigate('/locations');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WagmiConfig config={config}>
      <ThemeProvider theme={theme}>
        <Header ref={ref} />
        <LogInModal />
        <SignInModal />
        <CreateLocationModal />
        <Toasts />
        <PaymentModal />

        <div
          style={{ height: `calc(100% - ${height}px)`, position: 'relative' }}
        >
          <Router />
        </div>
      </ThemeProvider>
    </WagmiConfig>
  );
}

export default App;
