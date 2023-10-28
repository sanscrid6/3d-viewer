import { OrbitControls, Image, Gltf } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { Euler, Vector3, MathUtils } from 'three'
import { Scene } from './Scene'
import { ScreenRaycaster } from './ScreenRaycaster'

const offset = 0
const scale = 500
const size = 1 * scale


export function Viewer () {
  return (
      <Canvas >
        {/* <ScreenRaycaster /> */}
        <Scene />
      </Canvas>
  )
}
