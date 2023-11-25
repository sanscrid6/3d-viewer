import { Group, Object3D, Raycaster, Vector3 } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/Addons.js';
import { isMesh, isMeshStandardMaterial } from '../utils';
import { NavPoint } from './NavPoint';
import { ViewBox } from './ViewBox';

export class LocationScene extends Object3D {
  private _location!: GLTF;
  private _points!: Vector3[];
  private _root!: Group;

  private _navPoints: NavPoint[] = [];
  private _scale: number;
  private _box!: ViewBox;
  private _raycaster!: Raycaster;

  get points() {
    return this._points.map((p) => p.clone());
  }

  get navPoints() {
    return this._navPoints;
  }

  get viewBox() {
    return this._box;
  }

  constructor(scale: number) {
    super();

    this._scale = scale;
    this._raycaster = new Raycaster();
  }

  async loadGltf(url: string) {
    const loader = new GLTFLoader();

    this._location = await loader.loadAsync(url);
  }

  async buildScene() {
    this._root = this._location.scene as Group;

    const meshes = this._root.children.filter(isMesh);
    const spheres = meshes.filter((m) => m.name.startsWith('Sphere'));
    const triggers = meshes.filter((m) => m.name.startsWith('Trigger'));

    const realMeshes = meshes.filter((m) => m.name.startsWith('mesh'));
    realMeshes.forEach((m) => {
      m.updateMatrixWorld();
    });

    meshes.forEach((m) => {
      // m.visible = false;
      if (isMeshStandardMaterial(m.material)) {
        // m.material.wireframe = true;
        // m.material.vertexColors = true;
      }
    });

    const pointPositions = [];

    this._root.remove(...spheres);
    this._root.remove(...triggers);

    for (let i = 0; i < spheres.length; i++) {
      const s = spheres[i];
      const index = +s.name.slice(6);
      pointPositions.push({ position: s.position.clone(), index });
    }

    pointPositions.sort((a, b) => a.index - b.index);

    this._points = pointPositions.map((p) => p.position);

    this._box = new ViewBox();
    const index = 0;
    await this._box.loadTextures([
      `LiveOak/cube/${index + 1}_cubefront.jpg`,
      `LiveOak/cube/${index + 1}_cubeleft.jpg`,
      `LiveOak/cube/${index + 1}_cuberight.jpg`,
      `LiveOak/cube/${index + 1}_cubeback.jpg`,
      `LiveOak/cube/${index + 1}_cubeup.jpg`,
      `LiveOak/cube/${index + 1}_cubedown.jpg`,
    ]);
    await this._box.buildCube(this._scale);
    realMeshes.forEach((m) => {
      this.add(m);
    });
    this.add(this._box);

    this._box.position.copy(this._points[0]); // back front up down right left
  }

  createNavPoints() {
    const pointMeshes = [];

    for (let i = 0; i < this.points.length; i++) {
      const s = this.points[i];
      this._raycaster.set(s.clone(), new Vector3(0, -1, 0));
      const intersect = this._raycaster
        .intersectObjects(this.children.filter(isMesh), true)
        .filter((r) => !r.object.userData.ignoreRaycast);

      if (intersect.length === 0) continue;

      const pointMesh = new NavPoint(intersect[0].point);
      pointMesh.visible = false;
      pointMeshes.push(pointMesh);
      this.add(pointMesh);
    }

    this._navPoints = pointMeshes;
  }

  showNavPoints(currPoint: Vector3) {
    // this.navPoints.forEach((p) => {
    //   p.visible = true;
    // });

    for (const point of this.navPoints) {
      this._raycaster.set(
        point.position,
        currPoint.clone().sub(point.position),
      );

      const objects = this._raycaster
        .intersectObjects(this.children, true)
        .filter((o) => !o.object.userData.ignoreRaycast);

      if (
        objects.length === 0 ||
        objects[0].distance > point.position.distanceTo(currPoint)
      ) {
        point.visible = true;
      }
    }
  }

  hideNavPoints() {
    this.navPoints.forEach((p) => {
      p.visible = false;
    });
  }
}
