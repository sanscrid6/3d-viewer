import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { $modal, closeModal } from '../../state/modal';
import { useUnit } from 'effector-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginFx } from '../../state/user';
import { FormBuilder } from '../../utils/form-builder/FormBuilder';
import { ModalType } from '../../state/modal/types';
import { useNavigate } from 'react-router-dom';

const schemaCredentials = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function LogInModal() {
  const modal = useUnit($modal);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schemaCredentials>>({
    resolver: zodResolver(schemaCredentials),
  });

  const navigate = useNavigate();

  function closeHandler() {
    closeModal();

    reset();
  }

  async function submit(data: z.infer<typeof schemaCredentials>) {
    await loginFx(data);
    closeHandler();
    navigate('/locations');
  }

  return (
    <Dialog open={modal?.type === ModalType.LogIn} onClose={closeHandler}>
      <form onSubmit={handleSubmit(submit)}>
        <DialogTitle>Вход</DialogTitle>
        <DialogContent>
          <DialogContentText>Введите данные, чтобы войти</DialogContentText>

          <FormBuilder
            fields={[
              {
                name: 'email',
                type: 'email',
                label: 'Эл. почта',
              },
              {
                name: 'password',
                type: 'password',
                label: 'Пароль',
              },
            ]}
            register={register}
            errors={errors}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler}>Отмена</Button>
          <Button type="submit">Подтвердить</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
