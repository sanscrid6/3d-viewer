import { useStore, useUnit } from 'effector-react';
import { $eventSystem } from '../state/event-system';
import styles from './splash.module.css';
import { $location } from '../state/location';

type SplashProps = {
  setStart: (v: boolean) => void;
};

function Splash({ setStart }: SplashProps) {
  const eventSystem = useStore($eventSystem);
  const location = useUnit($location);

  function startHandler() {
    eventSystem.enabled = true;
    setStart(true);
  }

  return (
    <div className={styles.container}>
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
