import { Group, Object3D, Raycaster, Scene, Vector3 } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";
import { isMesh } from "../utils";
import { NavPoint } from "./NavPoint";
import { ViewBox } from "./ViewBox";

export class LocationScene extends Object3D {

    private _location!: GLTF
    private _points!: Vector3[]
    private _root!: Group

    private _navPoints: NavPoint[] = []
    private _scale: number;
    private _box: ViewBox;

    // getPointPosition(index: number){
    //     return this._points[index]
    // }

    get points(){
        return this._points.map(p => p.clone())
    }

    get navPoints(){
        return this._navPoints
    }

    get viewBox(){
        return this._box
    }

    constructor(scale: number){
        super()

        this._scale = scale;
    }

    async loadGltf(url: string){
        const loader = new GLTFLoader()

        this._location = await loader.loadAsync(url)
    }

    async buildScene(){
        this.children.push(this._location.scene)
        this._root =  this.children[0] as Group

        const meshes = this.children[0].children.filter(isMesh)
        const spheres = meshes.filter(m => m.name.startsWith('Sphere'))
        const triggers = meshes.filter(m => m.name.startsWith('Trigger'))

        meshes.forEach(m => {
            m.visible = false
        })

        const pointPositions = []
        const pointMeshes = []
        const raycaster = new Raycaster()

        for (let i = 0; i < spheres.length; i++) {
            const s = spheres[i]

            raycaster.set(s.position, new Vector3(0, -1, 0))
            const intersect = raycaster.intersectObjects(this.children)
            const index = +s.name.slice(6)

            pointPositions.push({ position: s.position.clone(), index })

            const pointMesh = new NavPoint(intersect[0].point)
            pointMeshes.push(pointMesh)
            this.add(pointMesh)
        }

        pointPositions.sort((a, b) => a.index - b.index)

        this._points = pointPositions.map(p => p.position)
        this._root.remove(...spheres)
        this._root.remove(...triggers)

        this._navPoints = pointMeshes

        this._box = new ViewBox()
        const index = 0
        this._box.position.copy(this._points[0])
        await this._box.loadTextures([
            `LiveOak/cube/${index + 1}_cubefront.jpg`,
            `LiveOak/cube/${index + 1}_cubeleft.jpg`,
            `LiveOak/cube/${index + 1}_cuberight.jpg`,
            `LiveOak/cube/${index + 1}_cubeback.jpg`,
            `LiveOak/cube/${index + 1}_cubeup.jpg`,
            `LiveOak/cube/${index + 1}_cubedown.jpg`
        ])
        await this._box.buildCube(this._scale)
        this.children.push(this._box)
    }
    
}