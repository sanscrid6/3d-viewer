import {
  Vector3,
  type Group,
  type Mesh,
  type Material,
  type Raycaster,
  type Camera,
  Vector2,
  type Object3D,
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

export const Vector3Zero = () => new Vector3(0, 0, 0);

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
