import { Vector3 } from 'three/src/math/Vector3.js';
import {
  Euler,
  MeshBasicMaterial,
  type Texture,
  Object3D,
  TextureLoader,
  Mesh,
  PlaneGeometry,
  MathUtils,
  SRGBColorSpace,
} from 'three';
import { isMeshBasicMaterial } from '../utils';

const sharedMaterial = new MeshBasicMaterial({
  transparent: true,
  opacity: 1,
  depthTest: false,
  depthWrite: false,
});

type Side = {
  texture: Texture;
  position: Vector3;
  rotation: Euler;
  scale: number;
};

export class ViewBox extends Object3D {
  private _currentTextures!: Texture[];
  private _sides: Mesh[] = [];

  // front left right back up bottom
  private _pos = [
    new Vector3(0, 0, -1 / 2),
    new Vector3(-1 / 2, 0, 0),
    new Vector3(1 / 2, 0, 0),
    new Vector3(0, 0, 1 / 2),
    new Vector3(0, 1 / 2, 0),
    new Vector3(0, -1 / 2, 0),
  ];

  private _rot = [
    new Euler(),
    new Euler(0, MathUtils.degToRad(90), 0),
    new Euler(0, MathUtils.degToRad(-90), 0),
    new Euler(0, MathUtils.degToRad(180), 0),
    new Euler(MathUtils.degToRad(90), 0, MathUtils.degToRad(90)),
    new Euler(MathUtils.degToRad(-90), 0, MathUtils.degToRad(-90)),
  ];

  constructor() {
    super();
    this.name = 'ViewBox';
  }

  async loadTextures(urls: string[]) {
    const loader = new TextureLoader();

    const textures = await Promise.all(urls.map((u) => loader.loadAsync(u)));

    this._currentTextures = textures;
    textures.forEach((t) => {
      t.colorSpace = SRGBColorSpace;
    });
  }

  private buildSide({ texture, position, rotation, scale }: Side) {
    const geometry = new PlaneGeometry(1, 1);
    const material = sharedMaterial.clone();
    material.map = texture;
    material.needsUpdate = true;
    material.reflectivity = 0;

    const mesh = new Mesh(geometry, material);
    mesh.position.copy(position);
    mesh.rotation.copy(rotation);
    mesh.scale.set(scale, scale, scale);
    mesh.userData.ignoreRaycast = true;

    return mesh;
  }

  dispose() {
    for (const side of this._sides) {
      side.geometry.dispose();
      if (isMeshBasicMaterial(side.material)) {
        side.material.map?.dispose();
        side.material.dispose();
      }

      this.remove(side);
    }
  }

  async buildCube(scale: number) {
    this.dispose();

    for (let i = 0; i < this._currentTextures.length; i++) {
      const side = this.buildSide({
        texture: this._currentTextures[i],
        position: this._pos[i].clone().multiplyScalar(scale),
        rotation: this._rot[i].clone(),
        scale,
      });

      this._sides.push(side);
      this.add(side);
    }
  }
}
