import { AmbientLight, Object3D, PerspectiveCamera, Scene } from 'three';
import { RenderSystem } from './RenderSystem';
import { MoveSytem } from './MoveSystem';
import { LocationScene } from './LocationScene';
import TWEEN from 'three/examples/jsm/libs/tween.module.js';
import { BaseSystem, SystemName } from './BaseSystem';
import { PointerSystem } from './PointerSystem';
import { asset, base } from '../api/utils';
import { $location, $params } from '../state/location';

export class Viewer {
  private readonly _canvas: HTMLCanvasElement;
  private readonly _mainScene: Scene;
  private readonly _camera: PerspectiveCamera;

  private _scale = 100;

  private readonly systems: BaseSystem[];
  private _locationScene!: LocationScene;

  public ready = false;

  public pointEnteredTime = 0;

  get scale() {
    return this._scale;
  }

  get canvas() {
    return this._canvas;
  }

  get mainScene() {
    return this._mainScene;
  }

  get locationScene() {
    return this._locationScene;
  }

  get camera() {
    return this._camera;
  }

  constructor() {
    this._canvas = document.getElementById('player')! as HTMLCanvasElement;

    this._camera = new PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      1,
      10000,
    );

    this._mainScene = new Scene();

    const light = new AmbientLight(0xffffff); // soft white light
    light.intensity = 1;
    this._mainScene.add(light);

    this.systems = [
      new RenderSystem(this),
      new MoveSytem(this),
      new PointerSystem(this),
    ];

    this.systems.forEach((s) => s.init());

    window.onbeforeunload = () => {
      navigator.sendBeacon(
        base + '/duration-stat',
        new URLSearchParams({
          locationId: $params.getState()!.locationId!,
          pointId: (
            this.getSystem<MoveSytem>(SystemName.Move).currentPoint + 1
          ).toString(),
          duration: (performance.now() - this.pointEnteredTime).toString(),
        }),
      );
    };
  }

  async init() {
    const scene = new LocationScene(this._scale);
    this._locationScene = scene;
    const id = $params.getState().locationId;

    await scene.loadGltf(asset(`/${id}/location.gltf`));
    await scene.buildScene();
    scene.createNavPoints();

    this._mainScene.children.push(scene);
    const pos = scene.points[0];
    scene.showNavPoints(pos);

    const move = this.systems.find((s) => s instanceof MoveSytem)! as MoveSytem;

    move.setCameraPos(pos);
    this.pointEnteredTime = performance.now();
  }

  getSystem<T extends BaseSystem>(name: SystemName) {
    return this.systems.find((s) => s.name === name) as T;
  }

  remove(o: Object3D) {
    this._mainScene.remove(o);
  }

  update(elapsed: number) {
    this.systems.forEach((s) => s.update());
    TWEEN.update(elapsed);

    requestAnimationFrame(this.update.bind(this));
  }
}
