import { Vector3 } from 'three/src/math/Vector3.js'
import { Euler, MeshBasicMaterial, type Texture, Object3D, TextureLoader, Mesh, PlaneGeometry, MathUtils } from 'three'
import { useMemo } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import { isMaterial } from '../utils'

// interface BoxProps {
//   sides: Side[]
//   scale: number
//   opacity: number
//   position: Vector3
// }

// interface Side {
//   position: Vector3
//   texture: Texture
//   rotation: Euler
//   key: string
// }

// export function Box ({ sides, scale, opacity, position }: BoxProps) {
//   const materials = sides.map(side => {
//     return new MeshBasicMaterial({
//       map: side.texture,
//       transparent: true,
//       opacity
//     })
//   })
//   // map на 6 материалов ?
//   console.log(position)

//   return (
//     <object3D name='container' position={position}>
//       {sides.map((side, index) => {
//         return (
//           <mesh
//             key={side.key}
//             material={materials[index]}
//             position={side.position}
//             rotation={side.rotation}
//             scale={scale}
//             userData={{ ignoreRaycast: true }}
//           >
//             <planeGeometry args={[1, 1]}/>
//           </mesh>
//         )
//       })}


//       {/* <PerspectiveCamera makeDefault/> */}

//       {/* <Image
//         position={new Vector3(currPoint.position.x, currPoint.position.y, currPoint.position.z - size / 2)}
//         texture={front}
//         scale={scale}
//         userData={{ ignoreRaycast: true }}
//       />
//       <Image
//         position={new Vector3(currPoint.position.x - size / 2, currPoint.position.y, currPoint.position.z)}
//         texture={left}
//         rotation={new Euler(0, MathUtils.degToRad(90), 0)}
//         scale={scale}
//         userData={{ ignoreRaycast: true }}
//       />
//       <Image
//         position={new Vector3(currPoint.position.x + size / 2, currPoint.position.y, currPoint.position.z)}
//         texture={right}
//         rotation={new Euler(0, MathUtils.degToRad(-90), 0)}
//         scale={scale}
//         userData={{ ignoreRaycast: true }}
//       />
//       <Image
//         position={new Vector3(currPoint.position.x, currPoint.position.y, currPoint.position.z + size / 2)}
//         texture={back}
//         rotation={new Euler(0, MathUtils.degToRad(180), 0)}
//         scale={scale}
//         userData={{ ignoreRaycast: true }}
//         />
//       <Image
//         position={new Vector3(currPoint.position.x, currPoint.position.y + size / 2, currPoint.position.z)}
//         texture={top}
//         rotation={new Euler(MathUtils.degToRad(90), 0, MathUtils.degToRad(90))}
//         scale={scale}
//         userData={{ ignoreRaycast: true }}
//       />
//       <Image
//         position={new Vector3(currPoint.position.x, currPoint.position.y - size / 2, currPoint.position.z)}
//         texture={bottom}
//         rotation={new Euler(MathUtils.degToRad(-90), 0, MathUtils.degToRad(-90))}
//         scale={scale}
//         userData={{ ignoreRaycast: true }}
//       /> */}

//     </object3D>
//   )
// }


const sharedMaterial = new MeshBasicMaterial({
    transparent: true,
    opacity: 1,
})

type Side = {
    texture: Texture,
    position: Vector3,
    rotation: Euler,
}

const size = 1

export class ViewBox extends Object3D {

    private _currentTextures!: Texture[]
    private _sides!: Mesh[]

    // front left right back up bottom
    private _pos = [
        new Vector3(0, 0, - size / 2),
        new Vector3(size / 2, 0, 0),
        new Vector3(size / 2, 0, 0),
        new Vector3(0, 0, size / 2),
        new Vector3(0, size / 2, 0),
        new Vector3(0, -size / 2, 0)
    ]

    private _rot = [
        new Euler(),
        new Euler(0 , MathUtils.degToRad(90), 0),
        new Euler(0 , MathUtils.degToRad(-90), 0),
        new Euler(0 , MathUtils.degToRad(180), 0),
        new Euler(MathUtils.degToRad(90), 0, MathUtils.degToRad(90)),
        new Euler(MathUtils.degToRad(-90), 0, MathUtils.degToRad(-90))
    ]

    constructor(){
        super()

        
    }

    async loadTextures(urls: string[]){
        const loader = new TextureLoader()

        const textures = await Promise.all(urls.map(u => loader.loadAsync(u)))

        this._currentTextures = textures
    }

    private buildSide({texture, position, rotation} : Side){
        const geometry = new PlaneGeometry(1, 1)
        const material = sharedMaterial.clone()
        material.map = texture

        const mesh = new Mesh(geometry, material)
        mesh.position.copy(position)
        mesh.rotation.copy(rotation)

        return mesh
    }

    dispose(){
        for(const side of this._sides){
            side.geometry.dispose()
            if(isMaterial(side.material)){
                side.material.dispose()
            } else {
                side.material.forEach(m => {
                    m.dispose()
                })
            }
        }

        this.children = []
    }

    async buildCube(scale: number){
        this.dispose()

        for(let i = 0; i < this._currentTextures.length; i++){
            const side = this.buildSide({
                texture: this._currentTextures[i],
                position: this._pos[i].clone(),
                rotation: this._rot[i].clone(),
            })

            this._sides.push(side)
        }

        this.scale.set(scale, scale, scale)

        this.children = this._sides
    }


}