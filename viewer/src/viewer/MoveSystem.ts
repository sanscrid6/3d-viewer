import { PerspectiveCamera, Vector3 } from "three";
import { BaseSystem } from "./BaseSystem";
import { Viewer } from "./Viewer";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export class MoveSytem extends BaseSystem{

    private readonly _controls: OrbitControls

    constructor(viewer: Viewer){
        super(viewer);

        this._controls = new OrbitControls( viewer.camera, viewer.canvas );
    }

    setCameraPos(v: Vector3){
        this.viewer.camera.position.copy(v)
        this._controls.update()
    }
}