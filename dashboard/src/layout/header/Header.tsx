import { routes } from '../../routes/routes';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { forwardRef, useEffect } from 'react';

import styles from './header.module.css';
import { $user, logOut, updateUserFx } from '../../state/user';
import { openModal } from '../../state/modal';
import {
  useSendTransaction,
  usePrepareSendTransaction,
  useConnect,
  useAccount,
} from 'wagmi';
import { ModalType } from '../../state/modal/types';
import { parseEther } from 'viem';
import { InjectedConnector } from 'wagmi/connectors/injected';

export const Header = forwardRef<HTMLElement | null>((_, ref) => {
  const user = useUnit($user);
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  function signInHandler() {
    openModal({ type: ModalType.SignIn });
  }

  function logInHandler() {
    openModal({ type: ModalType.LogIn });
  }

  function logOutHandler() {
    logOut();
    navigate('/');
  }

  return (
    <header className={styles.container} ref={ref}>
      <nav className={styles.navigation}>
        {routes
          .filter(({ path, isAuthed }) => isAuthed && path !== '/')
          .map(({ path, name, notShow }) => {
            if (!user || notShow) return null;

            return (
              <Link to={path} className={styles.link} key={name}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ paddingLeft: '0.5rem' }}
                >
                  {name}
                </Typography>
              </Link>
            );
          })}
      </nav>
      {!user && (
        <div className={styles.signContainer}>
          <Button onClick={logInHandler}>Войти</Button>
          <Button onClick={signInHandler}>Зарегистрироваться</Button>
        </div>
      )}
      {user && (
        <div className={styles.signContainer}>
          <Typography variant="h6" component="div">
            Баланс {user.balance ?? 0} USD
          </Typography>

          <Button
            onClick={() =>
              isConnected ? openModal({ type: ModalType.Payment }) : connect()
            }
          >
            {isConnected ? 'Пополнить счет' : 'Подключить кошелек'}
          </Button>
          <Button onClick={logOutHandler}>Выйти</Button>
        </div>
      )}
    </header>
  );
});
