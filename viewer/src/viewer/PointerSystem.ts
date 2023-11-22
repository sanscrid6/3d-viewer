import { Matrix3, Raycaster, Vector2, Vector3 } from 'three';
import { $eventSystem } from '../state/event-system';
import { EventSystem, EventType } from '../state/event-system/EventSystem';
import { BaseSystem } from './BaseSystem';
import { NavPoint } from './NavPoint';
import { Viewer } from './Viewer';
import { raycastFromScreen } from '../utils';

export class PointerSystem extends BaseSystem {
  private readonly _eventSystem: EventSystem;

  private _pointer?: NavPoint;
  private _raycaster: Raycaster;

  constructor(viewer: Viewer) {
    super(viewer);
    this._raycaster = new Raycaster();

    this._eventSystem = $eventSystem.getState();

    this._eventSystem.addListener(
      EventType.GlobalPointerMove,
      this.pointerMoveHandler.bind(this),
    );
  }

  pointerMoveHandler(e: MouseEvent) {
    if (!this.viewer.ready) return;

    if (!this._pointer) {
      this._pointer = new NavPoint(new Vector3());
      this.viewer.mainScene.add(this._pointer);
    }

    const objects = raycastFromScreen({
      raycaster: this._raycaster,
      screenPos: new Vector2(e.clientX, e.clientY),
      objects: this.viewer.locationScene.children,
      camera: this.viewer.camera,
    });

    const position = objects[0].point.clone();
    const normalMatrix = new Matrix3();
    const worldNormal = new Vector3();
    normalMatrix.getNormalMatrix(objects[0].object.matrixWorld);
    worldNormal
      .copy(objects[0].face!.normal)
      .applyMatrix3(normalMatrix)
      .normalize();
    this._pointer.position.copy(position);
    this._pointer.lookAt(worldNormal.clone().add(objects[0].point));

    const points = this.viewer.locationScene.navPoints;
    const offset = 3;

    points.forEach((p) => {
      if (p.position.distanceTo(position) <= NavPoint.radius - offset) {
        p.fadeIn();
      } else {
        p.fadeOut();
      }
    });
  }

  hidePointer() {
    if (!this._pointer) return;
    this._pointer!.visible = false;
  }

  showPointer() {
    if (!this._pointer) return;
    this._pointer!.visible = true;
  }
}
