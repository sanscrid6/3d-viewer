import { Gltf, OrbitControls, Image, PerspectiveCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useState } from 'react'
import { Vector3, Euler, MathUtils } from 'three'
import { isMesh } from './utils'
import back from './assets/LiveOak/cube/10_cubeback.jpg'
import front from './assets/LiveOak/cube/10_cubefront.jpg'
import left from './assets/LiveOak/cube/10_cubeleft.jpg'
import right from './assets/LiveOak/cube/10_cuberight.jpg'
import top from './assets/LiveOak/cube/10_cubeup.jpg'
import bottom from './assets/LiveOak/cube/10_cubedown.jpg'

const offset = 0
const scale = 500
const size = 1 * scale
const path1 = '/LiveOak/location.gltf'
const path2 = 'Parrot.glb'

// сделать все обьекты глтф трансперент
// сделать растоновку точек и ходьбу
// стейт
// 

export function Scene () {
  const three = useThree()
  console.log(three.scene)

  const [sphereCords, setSphereCords] = useState({ position: new Vector3() })

  if (three.scene.children[0]) {
    const s = three.scene.children[0].children.filter(isMesh).find(m => m.name.startsWith('Sphere10'))
    if (s) {
      // setSphereCords(s)
    }
  }

  return (
        <>
        {/* <Gltf src={path1} position={new Vector3(0, 0, 0)}/> */}
        <OrbitControls makeDefault position={new Vector3(0, 0, 0)}/>
        <ambientLight intensity={1} />
        <Image position={new Vector3(0, 0, -size / 2)} url={front} scale={scale}/>
        <Image position={new Vector3(-size / 2, 0, 0)} url={left} rotation={new Euler(0, MathUtils.degToRad(90), 0)} scale={scale}/>
        <Image position={new Vector3(size / 2, 0, 0)} url={right} rotation={new Euler(0, MathUtils.degToRad(-90), 0)} scale={scale}/>
        <Image position={new Vector3(0, 0, size / 2)} url={back} rotation={new Euler(0, MathUtils.degToRad(180), 0)} scale={scale}/>
        <Image position={new Vector3(0, size / 2, 0)} url={top} rotation={new Euler(MathUtils.degToRad(90), 0, MathUtils.degToRad(90))} scale={scale}/>
        <Image position={new Vector3(0, -size / 2, 0)} url={bottom} rotation={new Euler(MathUtils.degToRad(-90), 0, MathUtils.degToRad(-90))} scale={scale}/>
        </>
  )
}
