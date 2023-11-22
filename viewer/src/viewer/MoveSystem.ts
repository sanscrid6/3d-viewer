import {
  Raycaster,
  Vector2,
  Vector3,
} from 'three';
import { BaseSystem } from './BaseSystem';
import { Viewer } from './Viewer';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { $eventSystem } from '../state/event-system';
import { EventSystem, EventType } from '../state/event-system/EventSystem';
import { raycastFromScreen } from '../utils';

export class MoveSytem extends BaseSystem {
  private readonly _controls: OrbitControls;
  private _eventSystem: EventSystem;
  private _raycaster: Raycaster;

  private _currentPoint = 0;
  private _inMovement = false;

  constructor(viewer: Viewer) {
    super(viewer);

    this._controls = new OrbitControls(viewer.camera, viewer.canvas);
    this._eventSystem = $eventSystem.getState();
    this._raycaster = new Raycaster();

    this._eventSystem.addListener(
      EventType.GlobalPonterClick,
      this.moveTo.bind(this),
    );
  }

  async moveTo(e: MouseEvent) {
    if (this._inMovement) {
      return;
    }

    this._inMovement = true;

    const objects = raycastFromScreen({
      raycaster: this._raycaster,
      screenPos: new Vector2(e.clientX, e.clientY),
      objects: this.viewer.locationScene.children,
      camera: this.viewer.camera,
    });

    const position = objects[0].point.clone();
    const points = this.viewer.locationScene.points;

    const point = points.reduce(
      (acc, curr, index) => {
        if (acc.pos.distanceTo(position) > curr.distanceTo(position)) {
          return { pos: curr, index };
        }

        return acc;
      },
      { pos: new Vector3(Infinity, Infinity, Infinity), index: 0 },
    );

    this._currentPoint = point.index;

    this.viewer.locationScene.viewBox.position.copy(point.pos);
    await this.viewer.locationScene.viewBox.loadTextures([
      `LiveOak/cube/${this._currentPoint + 1}_cubefront.jpg`,
      `LiveOak/cube/${this._currentPoint + 1}_cubeleft.jpg`,
      `LiveOak/cube/${this._currentPoint + 1}_cuberight.jpg`,
      `LiveOak/cube/${this._currentPoint + 1}_cubeback.jpg`,
      `LiveOak/cube/${this._currentPoint + 1}_cubeup.jpg`,
      `LiveOak/cube/${this._currentPoint + 1}_cubedown.jpg`,
    ]);
    await this.viewer.locationScene.viewBox.buildCube(this.viewer.scale);

    this.viewer.camera.position.copy(point.pos);

    const lookAt = this.viewer.camera.rotation.clone();
    const forward = new Vector3(0, 0, 1);
    forward.applyEuler(lookAt);
    const target = forward.normalize();
    this._controls.target = point.pos.clone().sub(target);

    this._controls.update();

    this._inMovement = false;
  }

  setCameraPos(v: Vector3) {
    this._controls.target = v.clone().add(new Vector3(0.1, 0, 0));
    this.viewer.camera.position.copy(v);
    this._controls.update();
  }
}
