import { Viewer } from './Viewer';

export enum SystemName {
  Render = 'render',
  Move = 'move',
  Pointer = 'pointer',
}

export abstract class BaseSystem {
  protected readonly viewer: Viewer;
  public name!: SystemName;

  constructor(viewer: Viewer) {
    this.viewer = viewer;
  }

  update() {}

  init() {}
}
