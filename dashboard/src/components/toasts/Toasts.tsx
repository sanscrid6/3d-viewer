import { Alert, Snackbar } from '@mui/material';
import { $activeToast } from '../../state/toast/toast';
import { useUnit } from 'effector-react';

function Toasts() {
  const activeToast = useUnit($activeToast);

  function getText() {
    if (activeToast?.text) return activeToast?.text;

    if (activeToast?.type === 'ERROR') return 'Неизвестная ошибка';
    if (activeToast?.type === 'SUCCESS') return 'Успех';
  }

  return (
    <>
      {activeToast && (
        <Snackbar
          open={$activeToast !== null}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            severity={activeToast.type === 'SUCCESS' ? 'success' : 'error'}
            sx={{
              maxWidth: '20rem',
            }}
          >
            {getText()}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default Toasts;
