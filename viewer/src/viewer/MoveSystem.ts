import { Raycaster, Vector2, Vector3 } from 'three';
import { BaseSystem, SystemName } from './BaseSystem';
import { Viewer } from './Viewer';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { $eventSystem } from '../state/event-system';
import { EventSystem, EventType } from '../state/event-system/EventSystem';
import { lerpV3, raycastFromScreen } from '../utils';
import { Tween } from 'three/examples/jsm/libs/tween.module.js';
import { moveToFx } from '../state/viewer';
import { PointerSystem } from './PointerSystem';

export class MoveSytem extends BaseSystem {
  private readonly _controls: OrbitControls;
  private _eventSystem: EventSystem;
  private _raycaster: Raycaster;

  private _currentPoint = 0;
  private _inMovement = false;
  private _pointer!: PointerSystem;

  constructor(viewer: Viewer) {
    super(viewer);

    this.name = SystemName.Move;
    this._controls = new OrbitControls(viewer.camera, viewer.canvas);
    this._eventSystem = $eventSystem.getState();
    this._raycaster = new Raycaster();

    this._eventSystem.addListener(
      EventType.GlobalPonterClick,
      this.mouseListener.bind(this),
    );
  }

  init(): void {
    this._pointer = this.viewer.getSystem<PointerSystem>(SystemName.Pointer);
  }

  mouseListener(e: MouseEvent) {
    if (this._inMovement) {
      return;
    }

    const objects = raycastFromScreen({
      raycaster: this._raycaster,
      screenPos: new Vector2(e.clientX, e.clientY),
      objects: this.viewer.locationScene.children,
      camera: this.viewer.camera,
    });

    const position = objects[0].point.clone();
    const points = this.viewer.locationScene.points;

    const point = points
      .map((point, index) => ({ point, index }))
      .filter(({ point }) => {
        this._raycaster.set(
          this.viewer.camera.position,
          point.clone().sub(this.viewer.camera.position).normalize(),
        );

        const objects = this._raycaster
          .intersectObjects(this.viewer.locationScene.children, true)
          .filter((o) => !o.object.userData.ignoreRaycast);

        if (
          objects.length === 0 ||
          objects[0].distance > point.distanceTo(this.viewer.camera.position)
        )
          return true;

        return false;
      })
      .reduce(
        (acc, { point, index }) => {
          if (acc.pos.distanceTo(position) > point.distanceTo(position)) {
            return { pos: point, index };
          }

          return acc;
        },
        { pos: new Vector3(Infinity, Infinity, Infinity), index: 0 },
      );

    if (point.index === this._currentPoint) return;
    this._currentPoint = point.index;

    void moveToFx(point.index);
  }

  async moveTo(pointIdx: number) {
    this._inMovement = true;
    this._controls.enabled = false;

    const point = this.viewer.locationScene.points[pointIdx];

    await this.viewer.locationScene.viewBox.loadTextures([
      `LiveOak/cube/${this._currentPoint + 1}_cubefront.jpg`,
      `LiveOak/cube/${this._currentPoint + 1}_cubeleft.jpg`,
      `LiveOak/cube/${this._currentPoint + 1}_cuberight.jpg`,
      `LiveOak/cube/${this._currentPoint + 1}_cubeback.jpg`,
      `LiveOak/cube/${this._currentPoint + 1}_cubeup.jpg`,
      `LiveOak/cube/${this._currentPoint + 1}_cubedown.jpg`,
    ]);

    await this.viewer.locationScene.viewBox.buildNewCube(this.viewer.scale);

    const duration = 1000;

    const startCamera = this.viewer.camera.position.clone();
    const startBox = this.viewer.locationScene.viewBox.position.clone();
    this.viewer.locationScene.hideNavPoints();
    this._pointer.hidePointer();
    await new Promise((rs) => {
      new Tween({ lerp: 0 })
        .to({ lerp: 1 }, duration)
        .onUpdate(({ lerp }) => {
          const vCamera = lerpV3(startCamera, point, lerp);
          const vBox = lerpV3(startBox, point, lerp);
          this.viewer.locationScene.viewBox.alpha = lerp;

          this.viewer.camera.position.copy(vCamera);
          this.viewer.locationScene.viewBox.position.copy(vBox);
        })
        .onComplete(() => {
          rs(null);
        })
        .start();
    });
    this.viewer.locationScene.viewBox.position.copy(point);

    await this.viewer.locationScene.viewBox.buildCube(this.viewer.scale);
    this.viewer.locationScene.showNavPoints(point);
    this._pointer.showPointer();

    this.viewer.camera.position.copy(point);

    const lookAt = this.viewer.camera.rotation.clone();
    const forward = new Vector3(0, 0, 1);
    forward.applyEuler(lookAt);
    const target = forward.normalize();
    this._controls.target = point.clone().sub(target);

    this._controls.update();

    this._inMovement = false;
    this._controls.enabled = true;
  }

  setCameraPos(v: Vector3) {
    this._controls.target = v.clone().add(new Vector3(0.1, 0, 0));
    this.viewer.camera.position.copy(v);
    this._controls.update();
  }
}
