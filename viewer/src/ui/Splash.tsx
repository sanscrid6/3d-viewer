import { useStore } from 'effector-react';
import { $eventSystem } from '../state/event-system';
import styles from './splash.module.css';

type SplashProps = {
  setStart: (v: boolean) => void;
};

function Splash({ setStart }: SplashProps) {
  const eventSystem = useStore($eventSystem);

  function startHandler() {
    eventSystem.enabled = true;
    setStart(true);
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h1 className={styles.text}>My location</h1>
        <button className={styles.button} onClick={startHandler}>
          play
        </button>
      </div>
    </div>
  );
}

export default Splash;
