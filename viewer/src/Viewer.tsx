import { Canvas } from '@react-three/fiber'
import { Scene } from './Scene'
import { CirclePointer } from './CirclePointer'
import { useEffect, useState } from 'react'
import { NavPoint } from './NavPoint'

export function Viewer () {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function loader () {
      await NavPoint.loadTexture()
      setLoaded(true)
    }

    void loader()
  }, [])

  return (
    <>
      {loaded &&
      <Canvas
        shadows={false}
        gl={{ sortObjects: true }}
        camera={{ far: 10000, fov: 80 }}
      >
        <CirclePointer />
        <Scene />
      </Canvas>}
    </>

  )
}
