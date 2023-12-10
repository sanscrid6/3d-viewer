import { useStore, useUnit } from 'effector-react';
import { $eventSystem } from '../state/event-system';
import styles from './splash.module.css';
import { $location } from '../state/location';
import { asset } from '../api/utils';
import { useEffect, useState } from 'react';

type SplashProps = {
  setStart: (v: boolean) => void;
};

function Splash({ setStart }: SplashProps) {
  const eventSystem = useStore($eventSystem);
  const location = useUnit($location);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = asset('/' + location?.previewUrl);
    img.onload = () => setLoaded(true);
  }, [location?.previewUrl]);

  function startHandler() {
    eventSystem.enabled = true;
    setStart(true);
  }

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: loaded ? 'transparent' : 'black' }}
    >
      {location?.previewUrl && loaded && (
        <div
          className={styles.splash}
          style={{
            backgroundImage: `url('${asset('/' + location?.previewUrl)}')`,
          }}
        ></div>
      )}
      <div className={styles.info}>
        <h1 className={styles.text}>{location?.name}</h1>
        <button className={styles.button} onClick={startHandler}>
          Начать тур
        </button>
      </div>
    </div>
  );
}

export default Splash;
