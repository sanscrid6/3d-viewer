import {
  Mesh,
  Texture,
  Vector3,
  MeshBasicMaterial,
  PlaneGeometry,
  MathUtils,
  TextureLoader,
} from 'three';
import { isMaterial } from '../utils';

export interface IFadable {
  fadeIn: () => void;
  fadeOut: () => void;
}

export class NavPoint extends Mesh implements IFadable {
  static texture: Texture;
  static readonly radius = 20;

  public readonly isNavPoint = true;

  constructor(position: Vector3) {
    const material = new MeshBasicMaterial({
      map: NavPoint.texture,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      opacity: 0.5,
      polygonOffset: true,
      polygonOffsetFactor: -1.0,
      polygonOffsetUnits: -4.0,
    });

    super(new PlaneGeometry(1, 1), material);

    this.position.set(position.x, position.y, position.z);
    this.scale.set(NavPoint.radius, NavPoint.radius, NavPoint.radius);
    this.rotation.set(MathUtils.degToRad(-90), 0, 0);

    this.name = 'NavPoint';
    this.renderOrder = 1;
    this.userData.ignoreRaycast = true;
  }

  static async loadTexture() {
    const loader = new TextureLoader();
    this.texture = await loader.loadAsync('circle.png');
  }

  fadeIn() {
    if (isMaterial(this.material)) {
      this.material.opacity = 1;
    }
  }

  fadeOut() {
    if (isMaterial(this.material)) {
      this.material.opacity = 0.5;
    }
  }
}
