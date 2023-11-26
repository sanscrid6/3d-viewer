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
  private _newTextures: Texture[] = [];
  private _sides: Mesh<PlaneGeometry, MeshBasicMaterial>[] = [];
  private _oldTextures: Texture[] = [];

  private _newSides: Mesh<PlaneGeometry, MeshBasicMaterial>[] = [];

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

  set alpha(n: number) {
    this._sides.forEach((s) => {
      if (isMeshBasicMaterial(s.material)) {
        s.material.opacity = 1 - n;
      }
    });
  }

  constructor() {
    super();
    this.name = 'ViewBox';
  }

  buildCube(scale: number) {
    this.build(scale, this._sides, this._newTextures, 1);

    this._oldTextures = this._newTextures;
    this._newTextures = [];
  }

  buildNewCube(scale: number) {
    this.build(scale, this._newSides, this._newTextures, 0);
  }

  async loadTextures(urls: string[]) {
    const loader = new TextureLoader();

    const textures = await Promise.all(urls.map((u) => loader.loadAsync(u)));

    this._newTextures = textures;
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

  private dispose(sides: Mesh<PlaneGeometry, MeshBasicMaterial>[]) {
    for (const side of sides) {
      side.geometry.dispose();
      side.material.map?.dispose();
      side.material.dispose();

      this.remove(side);
    }

    sides = [];
  }

  private build(
    scale: number,
    sides: Mesh<PlaneGeometry, MeshBasicMaterial>[],
    textures: Texture[],
    renderOrder: number,
  ) {
    this.dispose(sides);

    for (let i = 0; i < textures.length; i++) {
      const side = this.buildSide({
        texture: textures[i],
        position: this._pos[i].clone().multiplyScalar(scale),
        rotation: this._rot[i].clone(),
        scale,
      });
      side.renderOrder = renderOrder;
      sides.push(side);
      this.add(side);
    }
  }
}
