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
import { FormBuilder } from '../../utils/form-builder/FormBuilder';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { registerFx } from '../../state/user';
import { ModalType } from '../../state/modal/types';
import { useNavigate } from 'react-router-dom';

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    passwordAgain: z.string().min(6),
    // firstName: z.string().min(1),
    // lastName: z.string().min(1),
    // birthDate: z.string(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.passwordAgain) {
      ctx.addIssue({
        path: ['passwordAgain'],
        code: z.ZodIssueCode.custom,
        message: 'Пароли не совпадают',
      });
    }

    // if (new Date(val.birthDate).getTime() > Date.now()) {
    //   ctx.addIssue({
    //     path: ['birthDate'],
    //     code: z.ZodIssueCode.custom,
    //     message: 'Не корректная дата рождения',
    //   });
    // }
  });

export function SignInModal() {
  const modal = useUnit($modal);
  const pending = useUnit(registerFx.pending);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  function closeHandler() {
    reset();
    closeModal();
  }

  async function submit(data: z.infer<typeof schema>) {
    if (pending) return;

    await registerFx(data);
    closeHandler();
    navigate('/locations');
  }

  return (
    <Dialog open={modal?.type === ModalType.SignIn} onClose={closeHandler}>
      <form onSubmit={handleSubmit(submit)}>
        <DialogTitle>Зарегистрироваться</DialogTitle>
        <DialogContent>
          <DialogContentText>Введите данные для регистрации</DialogContentText>

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
              {
                name: 'passwordAgain',
                type: 'password',
                label: 'Пароль еще раз',
              },
              // {
              //   name: 'firstName',
              //   type: 'text',
              //   label: 'Имя',
              // },
              // {
              //   name: 'lastName',
              //   type: 'text',
              //   label: 'Фамилия',
              // },
              // {
              //   name: 'birthDate',
              //   type: 'date',
              //   autoFocus: true,
              // },
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
