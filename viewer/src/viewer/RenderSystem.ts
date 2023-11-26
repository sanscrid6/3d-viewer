import { SRGBColorSpace, WebGLRenderer } from 'three';
import { BaseSystem, SystemName } from './BaseSystem';
import { Viewer } from './Viewer';

export class RenderSystem extends BaseSystem {
  private readonly _renderer: WebGLRenderer;

  get renderer() {
    return this._renderer;
  }

  constructor(viewer: Viewer) {
    super(viewer);
    this.name = SystemName.Render;

    this._renderer = new WebGLRenderer({ canvas: viewer.canvas });
    this._renderer.setSize(window.innerWidth, window.innerHeight);

    this._renderer.outputColorSpace = SRGBColorSpace;

    window.addEventListener('resize', () => {
      this._renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  update(): void {
    this._renderer.renderLists.dispose();
    this.renderer.render(this.viewer.mainScene, this.viewer.camera);
  }
}
