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
import { $user, loginFx, updateUserFx } from '../../state/user';
import { FormBuilder } from '../../utils/form-builder/FormBuilder';
import { ModalType } from '../../state/modal/types';
import { useNavigate } from 'react-router-dom';
import { useSendTransaction } from 'wagmi';
import { useEffect } from 'react';
import { parseEther } from 'viem';

const schemaCredentials = z.object({
  amount: z.coerce.number(),
});

export function PaymentModal() {
  const modal = useUnit($modal);
  const userId = useUnit($user.map((u) => u?.id));

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schemaCredentials>>({
    resolver: zodResolver(schemaCredentials),
  });

  const navigate = useNavigate();

  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    to: '0x914eF35997eFD68eC08580929EE193904FfFA90d',
    value: parseEther('1'),
  });

  useEffect(() => {
    if (data && userId) {
      console.log('send');
      updateUserFx({ hash: data.hash, id: userId });
    }
  }, [data, userId]);

  function closeHandler() {
    closeModal();

    reset();
  }

  async function submit(data: z.infer<typeof schemaCredentials>) {
    await sendTransaction({
      value: parseEther(data.amount.toString()),
      to: '0x914eF35997eFD68eC08580929EE193904FfFA90d',
    });
    closeHandler();
    navigate('/locations');
  }

  return (
    <Dialog
      open={modal?.type === ModalType.Payment}
      onClose={closeHandler}
      sx={{ minWidth: '20rem' }}
    >
      <form onSubmit={handleSubmit(submit)}>
        <DialogTitle>Пополнение</DialogTitle>
        <DialogContent>
          <DialogContentText>Введите сумму</DialogContentText>

          <FormBuilder
            fields={[
              {
                name: 'amount',
                type: 'text',
                label: 'Cyмма в eth',
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
