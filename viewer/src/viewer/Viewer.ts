import { AmbientLight, Object3D, PerspectiveCamera, Scene } from "three";
import { RenderSystem } from "./RenderSystem";
import { MoveSytem } from "./MoveSystem";
import { LocationScene } from "./LocationScene";
import TWEEN from 'three/examples/jsm/libs/tween.module.js'
import { BaseSystem } from "./BaseSystem";

const path = '/LiveOak/location.gltf'

export class Viewer {
    private readonly _canvas: HTMLCanvasElement
    private readonly _mainScene: Scene
    private readonly _camera: PerspectiveCamera

    private _scale = 100

    private readonly systems: BaseSystem[]

    get scale(){
        return this._scale
    }

    get canvas(){
        return this._canvas
    }

    get scene(){
        return this._mainScene
    }
    
    get camera(){
        return this._camera
    }

    constructor(){
        this._canvas = document.getElementById('player')! as HTMLCanvasElement

        this._camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );

        this._mainScene = new Scene();
        const light = new AmbientLight( 0x404040 ); // soft white light
        light.intensity = 1
        this._mainScene.add( light );

        this.systems = [
            new RenderSystem(this),
            new MoveSytem(this)
        ]
    }

    async init(){
        const scene = new LocationScene()

        await scene.loadGltf(path)
        await scene.buildScene()

        this._mainScene.children.push(scene)
        const pos = scene.getPointPosition(0)

        const move = this.systems.find(s => s instanceof MoveSytem)! as MoveSytem

        move.setCameraPos(pos)
    }


    remove(o: Object3D){
        this._mainScene.remove(o)
    }


    update(elapsed: number){
        this.systems.forEach(s => s.update())
        TWEEN.update(elapsed)

        requestAnimationFrame(this.update.bind(this))
    }
}