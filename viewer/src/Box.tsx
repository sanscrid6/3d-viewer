import { type Vector3 } from 'three/src/math/Vector3.js'
import { type Euler, MeshBasicMaterial, type Texture } from 'three'
import { useMemo } from 'react'

interface BoxProps {
  sides: Side[]
  scale: number
  opacity: number
}

interface Side {
  position: Vector3
  texture: Texture
  rotation: Euler
  key: string
}

export function Box ({ sides, scale, opacity }: BoxProps) {
  const material = useMemo(() => {
    return new MeshBasicMaterial({

    })
  }, [opacity, sides])
  // map на 6 материалов ?

  return (
    <>
      {sides.map(side => {
        return (
          <mesh
            key={side.key}
            material={material}
            position={side.position}
            rotation={side.rotation}
            scale={scale}
          >
            <planeBufferGeometry args={[1, 1]}/>
          </mesh>
        )
      })}

      {/* <Image
        position={new Vector3(currPoint.position.x, currPoint.position.y, currPoint.position.z - size / 2)}
        texture={front}
        scale={scale}
        userData={{ ignoreRaycast: true }}
      />
      <Image
        position={new Vector3(currPoint.position.x - size / 2, currPoint.position.y, currPoint.position.z)}
        texture={left}
        rotation={new Euler(0, MathUtils.degToRad(90), 0)}
        scale={scale}
        userData={{ ignoreRaycast: true }}
      />
      <Image
        position={new Vector3(currPoint.position.x + size / 2, currPoint.position.y, currPoint.position.z)}
        texture={right}
        rotation={new Euler(0, MathUtils.degToRad(-90), 0)}
        scale={scale}
        userData={{ ignoreRaycast: true }}
      />
      <Image
        position={new Vector3(currPoint.position.x, currPoint.position.y, currPoint.position.z + size / 2)}
        texture={back}
        rotation={new Euler(0, MathUtils.degToRad(180), 0)}
        scale={scale}
        userData={{ ignoreRaycast: true }}
        />
      <Image
        position={new Vector3(currPoint.position.x, currPoint.position.y + size / 2, currPoint.position.z)}
        texture={top}
        rotation={new Euler(MathUtils.degToRad(90), 0, MathUtils.degToRad(90))}
        scale={scale}
        userData={{ ignoreRaycast: true }}
      />
      <Image
        position={new Vector3(currPoint.position.x, currPoint.position.y - size / 2, currPoint.position.z)}
        texture={bottom}
        rotation={new Euler(MathUtils.degToRad(-90), 0, MathUtils.degToRad(-90))}
        scale={scale}
        userData={{ ignoreRaycast: true }}
      /> */}

    </>
  )
}
