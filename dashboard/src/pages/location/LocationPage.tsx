import { styled } from '@mui/material/styles';
import { Button, TextField, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styles from './location-page.module.css';
import {
  $currentLocation,
  $locationStats,
  getCurrentLocationFx,
  updateArchiveFx,
  updateLocation,
  updateLocationFx,
  updatePreviewFx,
} from '../../state/location';
import { useUnit } from 'effector-react';
import { useRef } from 'react';
import { asset } from '../../api/utils';

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
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
      //onClick={onClick}
    >
      {text}
      <VisuallyHiddenInput
        ref={ref}
        type="file"
        onChange={(e) => {
          onClick(e.target.files!.item(0)!);

          e.target.files = null;
        }}
      />
    </Button>
  );
}

function Preview({
  url,
  handler,
}: {
  url?: string;
  handler: (blob: Blob) => Promise<void>;
}) {
  return (
    <div className={styles.preview}>
      {url && (
        <img
          alt="preview"
          className={styles.preview}
          src={asset('/' + url)}
          crossOrigin="anonymous"
        />
      )}
      {!url && (
        <div className={styles.buttonContainer}>
          <InputFileUpload text="Загрузить превью" onClick={handler} />
        </div>
      )}
    </div>
  );
}

function format(ms: number) {
  ms /= 1000;

  let h = 0;
  let m = 0;
  let s = 0;

  h = Math.floor(ms / 3600);
  ms -= h * 3600;
  m = Math.floor(ms / 60);
  ms -= m * 60;
  s = Math.floor(ms);

  return `${h} часов ${m} минут ${s} секунд`;
}

function LocationPage() {
  const location = useUnit($currentLocation);
  const locationStats = useUnit($locationStats);

  async function uploadArchive(blob: Blob) {
    await updateArchiveFx({ id: location!.id, archive: blob });
  }

  async function updateLocationHandler() {
    location && (await updateLocationFx(location));
  }

  async function changePrivacyHandler() {
    if (location) {
      await updateLocationFx({ ...location, isPublic: !location.isPublic });
      await getCurrentLocationFx(location.id);
    }
  }

  function uploadPreviewHandler() {
    return async (b: Blob) => {
      await updatePreviewFx({ id: location!.id, image: b });
    };
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
            <div>Просмотрели: {locationStats?.unique}</div>
            <div>Общее Время: {format(locationStats?.sumDuration ?? 0)}</div>
          </Typography>
        </div>
        <Preview url={location?.previewUrl} handler={uploadPreviewHandler()} />
      </div>
      <div className={styles.buttons}>
        <Button variant="contained" onClick={updateLocationHandler}>
          Сохранить
        </Button>
        <Button variant="contained" onClick={changePrivacyHandler}>
          {location?.isPublic ? 'Сделать приватной' : 'Сделать публичной'}
        </Button>
        <InputFileUpload text="Зaгрузить архив" onClick={uploadArchive} />
      </div>
    </div>
  );
}

export default LocationPage;
