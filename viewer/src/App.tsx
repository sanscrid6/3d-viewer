import { useEffect } from 'react';
import './App.css';
import { $params, getLocationFx } from './state/location';
import { Viewer } from './ui/Viewer';
import { useUnit } from 'effector-react';

function App() {
  const params = useUnit($params);

  useEffect(() => {
    getLocationFx(params.locationId!);
  }, [params.locationId]);

  return (
    <>
      <Viewer />
    </>
  );
}

export default App;
