import { Canvas } from '@react-three/fiber'
import { Scene } from './Scene'
import { CirclePointer } from './CirclePointer'
import { useEffect, useState } from 'react'
import { NavPoint } from './viewer/NavPoint'
import { $viewer } from './state/viewer'
import { useStore } from 'effector-react'

export function Viewer () {
  const [loaded, setLoaded] = useState(false)
  const viewer = useStore($viewer)

  useEffect(() => {
    async function loader () {
      await NavPoint.loadTexture()
      viewer.ready = true
      await viewer.init()
      setLoaded(true)
    }

    void loader()
  }, [])
  

  return (
    <>
      {/* {loaded &&
      <Canvas
        shadows={false}
        gl={{ sortObjects: true }}
        camera={{ far: 10000, fov: 80 }}
      >
        <CirclePointer />
        <Scene />
      </Canvas>} */}
    </>

  )
}
