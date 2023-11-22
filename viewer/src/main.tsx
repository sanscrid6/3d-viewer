import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import * as THREE from 'three';
import {
  computeBoundsTree,
  disposeBoundsTree,
  acceleratedRaycast,
} from 'three-mesh-bvh';

//@ts-expect-error set prototype
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
//@ts-expect-error set prototype
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
