import { useEffect, useState } from 'react';
import { NavPoint } from '../viewer/NavPoint';
import { $viewer } from '../state/viewer';
import { useStore } from 'effector-react';
import Splash from './Splash';

export function Viewer() {
  const [loaded, setLoaded] = useState(false);
  const [start, setStart] = useState(false);
  const viewer = useStore($viewer);

  useEffect(() => {
    async function loader() {
      await NavPoint.loadTexture();
      viewer.ready = true;
      await viewer.init();
      setLoaded(true);
    }

    void loader();
  }, []);

  return <>{!(loaded && start) && <Splash setStart={setStart} />}</>;
}
