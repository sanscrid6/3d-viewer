import {
  Vector3,
  type Group,
  type Mesh,
  type Material,
  type Raycaster,
  type Camera,
  Vector2,
  type Object3D,
  MathUtils,
  MeshStandardMaterial,
  MeshBasicMaterial,
} from 'three';
import { type NavPoint } from './viewer/NavPoint';

export function isMesh(mesh: any): mesh is Mesh {
  return mesh.isMesh;
}

export function isGroup(group: any): group is Group {
  return group.isGroup;
}

export function isMaterial(material: any): material is Material {
  return material.isMaterial;
}

export function isNavPoint(point: any): point is NavPoint {
  return point.isNavPoint;
}

export function isMeshStandardMaterial(m: any): m is MeshStandardMaterial {
  return m.type === 'MeshStandardMaterial';
}

export function isMeshBasicMaterial(m: any): m is MeshBasicMaterial {
  return m.type === 'MeshBasicMaterial';
}

type RaycastFromScreenArgs = {
  raycaster: Raycaster;
  camera: Camera;
  screenPos: Vector2;
  objects: Object3D[];
};

export function raycastFromScreen({
  screenPos,
  camera,
  objects,
  raycaster,
}: RaycastFromScreenArgs) {
  const ray = new Vector2(
    (screenPos.x / window.innerWidth) * 2 - 1,
    -(screenPos.y / window.innerHeight) * 2 + 1,
  );

  raycaster.setFromCamera(ray, camera);
  const result = raycaster.intersectObjects(objects, true);

  return result.filter((r) => !r.object.userData.ignoreRaycast);
}

export function lerpV3(start: Vector3, end: Vector3, lerp: number) {
  const x = MathUtils.lerp(start.x, end.x, lerp);
  const y = MathUtils.lerp(start.y, end.y, lerp);
  const z = MathUtils.lerp(start.z, end.z, lerp);

  return new Vector3(x, y, z);
}

export function sleep(ms: number) {
  return new Promise((rs) => setTimeout(rs, ms));
}
