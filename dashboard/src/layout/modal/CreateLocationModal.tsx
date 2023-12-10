import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { $modal, closeModal } from '../../state/modal';
import { useUnit } from 'effector-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormBuilder } from '../../utils/form-builder/FormBuilder';
import { ModalType } from '../../state/modal/types';
import { useNavigate } from 'react-router-dom';
import { addLocationFx } from '../../state/location';

const schemaCredentials = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export function CreateLocationModal() {
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
    await addLocationFx(data);
    closeHandler();
    navigate('/locations');
  }

  return (
    <Dialog open={modal?.type === ModalType.AddLocation} onClose={closeHandler}>
      <form onSubmit={handleSubmit(submit)}>
        <DialogTitle>Создание</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Введите данные, чтобы войти</DialogContentText> */}

          <FormBuilder
            fields={[
              {
                name: 'name',
                type: 'text',
                label: 'Название',
              },
              {
                name: 'description',
                type: 'text',
                label: 'Описание',
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
