import { useLoader } from '@react-three/fiber'
import { useMemo } from 'react'
import Three from 'three'

export const Image = ({ src }: { src: string }) => {
  const texture = useLoader(Three.TextureLoader, src)

  useMemo(() => {
    texture.generateMipmaps = false
    texture.wrapS = texture.wrapT = Three.ClampToEdgeWrapping
    texture.minFilter = Three.LinearFilter
    texture.needsUpdate = true
  }, [
    texture.generateMipmaps,
    texture.wrapS,
    texture.wrapT,
    texture.minFilter,
    texture.needsUpdate
  ])

  // Here we grab the size and position of the image from the DOM
  // const { width, height, top, left } = image.data.getBoundingClientRect()
  return (
      <mesh
        // We convert the width and height to relative viewport units
        // scale={[
        //   (width / window.innerWidth) * viewport.width,
        //   (height / window.innerHeight) * viewport.height,
        //   1,
        // ]}
        // // We convert the x and y positions to relative viewport units
        // position={[
        //   ((width / window.innerWidth) * viewport.width) / 2 -
        //     viewport.width / 2 +
        //     (left / window.innerWidth) * viewport.width,
        //   0 -
        //     ((height / window.innerHeight) * viewport.height) / 2 +
        //     viewport.height / 2 -
        //     (top / window.innerHeight) * viewport.height,
        //   0,
        // ]}
      >
        {/* We're use a simple plane geometry */}
        {/* think of it like a piece of paper as a 3d shape */}
        <planeBufferGeometry attach="geometry" />
        {/* Finally we map the texture to a material */}
        {/* or in other terms, put the image on the shape */}
        <meshBasicMaterial attach="material" map={texture} />
      </mesh>
  )
}
