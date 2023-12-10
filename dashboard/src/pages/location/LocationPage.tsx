import { styled } from '@mui/material/styles';
import { Button, TextField, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styles from './location-page.module.css';
import {
  $currentLocation,
  updateArchiveFx,
  updateLocation,
  updateLocationFx,
} from '../../state/location';
import { useUnit } from 'effector-react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export function InputFileUpload({
  text,
  onClick,
}: {
  text: string;
  onClick: (blob: Blob) => void;
}) {
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
      //onClick={onClick}
    >
      {text}
      <VisuallyHiddenInput
        type="file"
        onChange={(e) => {
          onClick(e.target.files!.item(0)!);
        }}
      />
    </Button>
  );
}

function LocationPage() {
  const location = useUnit($currentLocation);

  async function uploadArchive(blob: Blob) {
    await updateArchiveFx({ id: location!.id, archive: blob });
  }

  async function updateLocationHandler() {
    location && (await updateLocationFx(location));
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.dataContainer}>
          <TextField
            label="Название"
            variant="standard"
            value={location?.name}
            onChange={(e) => updateLocation({ name: e.target.value })}
          />
          <TextField
            label="Описание"
            variant="standard"
            value={location?.description}
            onChange={(e) => updateLocation({ description: e.target.value })}
          />

          <Typography variant="subtitle2" className={styles.stats}>
            <div>Просмотрели: 133</div>
            <div>Общее Время: 134 часа</div>
          </Typography>
        </div>
        <img
          className={styles.preview}
          alt="preview"
          src={
            'https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg'
          }
        />
      </div>
      <div className={styles.buttons}>
        <Button variant="contained" onClick={updateLocationHandler}>
          Сохранить
        </Button>
        <InputFileUpload text="Зaгрузить архив" onClick={uploadArchive} />
      </div>
    </div>
  );
}

export default LocationPage;
