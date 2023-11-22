import { Viewer } from './Viewer';

export abstract class BaseSystem {
  protected readonly viewer: Viewer;

  constructor(viewer: Viewer) {
    this.viewer = viewer;
  }

  update() {}
}
