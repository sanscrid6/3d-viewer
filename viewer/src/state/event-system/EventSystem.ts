import { EventEmitter } from 'events';
import { Vector2 } from 'three';

export enum EventType {
  GlobalPonterClick = 'globalpointerclick',
  GlobalPointerMove = 'globalpointermove',
}

export class EventSystem extends EventEmitter {
  private pointerDownPos = {
    pos: new Vector2(),
    time: Date.now(),
  };

  private readonly distEpsilon = 20;
  private readonly timeEpsilon = 2000;

  public enabled = false;

  constructor() {
    super();
    window.addEventListener(
      'mousemove',
      this.globalPointerMoveHandler.bind(this),
    );
    window.addEventListener(
      'mousedown',
      this.globalPointerDownHandler.bind(this),
    );
    window.addEventListener('mouseup', this.globalPointerUpHandler.bind(this));
  }

  private globalPointerMoveHandler(e: MouseEvent) {
    if (!this.enabled) return;
    this.emit(EventType.GlobalPointerMove, e);
  }

  private globalPointerDownHandler(e: MouseEvent) {
    if (!this.enabled) return;

    this.pointerDownPos = {
      pos: new Vector2(e.clientX, e.clientY),
      time: Date.now(),
    };
  }

  private globalPointerUpHandler(e: MouseEvent) {
    if (!this.enabled) return;

    if (
      this.pointerDownPos.pos.distanceTo(new Vector2(e.clientX, e.clientY)) <
        this.distEpsilon &&
      Date.now() - this.pointerDownPos.time < this.timeEpsilon
    ) {
      this.emit(EventType.GlobalPonterClick, e);
    }
  }
}
