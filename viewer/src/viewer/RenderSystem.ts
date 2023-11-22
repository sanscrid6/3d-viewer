import { SRGBColorSpace, WebGLRenderer } from 'three';
import { BaseSystem } from './BaseSystem';
import { Viewer } from './Viewer';

export class RenderSystem extends BaseSystem {
  private readonly _renderer: WebGLRenderer;

  get renderer() {
    return this._renderer;
  }

  constructor(viewer: Viewer) {
    super(viewer);

    this._renderer = new WebGLRenderer({ canvas: viewer.canvas });
    this._renderer.setSize(window.innerWidth, window.innerHeight);

    this._renderer.outputColorSpace = SRGBColorSpace;
    // this._renderer. = true;
  }

  update(): void {
    this._renderer.renderLists.dispose();
    this.renderer.render(this.viewer.mainScene, this.viewer.camera);
  }
}
