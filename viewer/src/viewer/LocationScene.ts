import { Group, Object3D, Raycaster, Scene, Vector3 } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";
import { isMesh } from "../utils";
import { NavPoint } from "./NavPoint";

export class LocationScene extends Object3D {

    private _location!: GLTF
    private _points!: Vector3[]
    private _root!: Group

    constructor(){
        super()
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
            // scene.add(pointMesh)
        }

        pointPositions.sort((a, b) => a.index - b.index)

        this._points = pointPositions.map(p => p.position)
        this._root.remove(...spheres)
        this._root.remove(...triggers)
    }

    getPointPosition(index: number){
        return this._points[index]
    }
    
}