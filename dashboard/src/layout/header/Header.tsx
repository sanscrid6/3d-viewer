import { routes } from '../../routes/routes';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { forwardRef } from 'react';

import styles from './header.module.css';
import { $user, logOut } from '../../state/user';
import { openModal } from '../../state/modal';
import { ModalType } from '../../state/modal/types';

export const Header = forwardRef<HTMLElement | null>((_, ref) => {
  const user = useUnit($user);
  const navigate = useNavigate();

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
          {/* <Typography variant="h6" component="div">
            {user.firstName} {user.lastName}
          </Typography> */}
          <Button onClick={logOutHandler}>Выйти</Button>
        </div>
      )}
    </header>
  );
});
