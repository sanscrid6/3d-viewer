import { useEffect, useState } from 'react';
import { NavPoint } from './viewer/NavPoint';
import { $viewer } from './state/viewer';
import { useStore } from 'effector-react';

export function Viewer() {
  const [loaded, setLoaded] = useState(false);
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

  return <></>;
}
