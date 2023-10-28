import { Image } from '@react-three/drei'
import { useLoader, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useState } from 'react'
import { Euler, Material, MathUtils, MeshBasicMaterial, Object3D, TextureLoader, Vector2, Vector3 } from 'three'
import circle from './assets/circle.png'

export function ScreenRaycaster () {
  const three = useThree()
  const [pointerMesh, setPointerMesh] = useState({
    position: new Vector3(),
    rotation: new Euler()
  })

  const tex = useLoader(TextureLoader, '/circle.png')

  useEffect(() => {
    function handler (e: MouseEvent) {
      const ray = new Vector2((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1)

      three.raycaster.setFromCamera(ray, three.camera)
      const result = three.raycaster.intersectObjects(three.scene.children, true)

      if (result.length) {
        const position = result[0].point.clone()
        let rotation = new Euler()
        if (result[0].face) {
          // const from = result[0].
          rotation = new Euler(Math.acos(result[0].face.normal.x), Math.acos(result[0].face.normal.y), Math.acos(result[0].face.normal.z))
          // const q = new Object3D();
        }

        setPointerMesh({ position, rotation })
        // console.log(result[0].normal)
      }
    }

    const canvas = document.getElementsByTagName('canvas')[0]

    canvas.addEventListener('mousemove', handler)

    return () => {
      canvas.removeEventListener('mousemove', handler)
    }
  }, [])

  const material = useMemo(() => {
    const m = new MeshBasicMaterial({
      map: tex,
      opacity: 0.5,
      transparent: true,
      depthTest: false
    })

    return m
  }, [])

  return (
        <>
            <mesh {...pointerMesh}> 
              <planeGeometry args={[40, 40]}/>
              <meshBasicMaterial transparent={true} opacity={0.5} depthTest={false} map={tex}/>
            </mesh>
        </>
  )
}
