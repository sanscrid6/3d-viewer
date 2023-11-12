// import { useLoader, useThree } from '@react-three/fiber'
// import { useStore } from 'effector-react'
// import { useEffect, useMemo, useRef, useState } from 'react'
// import { type Mesh, MeshBasicMaterial, TextureLoader, Vector2, Vector3, Matrix3 } from 'three'
// import { $eventSystem } from './state/event-system'
// import { EventType } from './state/event-system/EventSystem'
// import { isNavPoint, raycastFromScreen } from './utils'
// import { NavPoint } from './viewer/NavPoint'

// export function CirclePointer () {
//   const camera = useThree(state => state.camera)
//   const raycaster = useThree(state => state.raycaster)
//   const scene = useThree(state => state.scene)

//   const eventSystem = useStore($eventSystem)
//   // Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>
//   const ref = useRef<any>()
  
//   const [hoveredNav, setHoveredNav] = useState<NavPoint>()
//   const [pointerMesh, setPointerMesh] = useState({
//     position: new Vector3()
//   })

//   const circle = useLoader(TextureLoader, '/circle.png')

//   useEffect(() => {
//     function handler (e: MouseEvent) {
//       const mesh = ref.current as Mesh
//       const result = raycastFromScreen(raycaster, camera, new Vector2(e.clientX, e.clientY), scene.children)

//       if (result.length && result[0].face) {
//         const position = result[0].point.clone()
//         const normalMatrix = new Matrix3()
//         const worldNormal = new Vector3()
//         normalMatrix.getNormalMatrix(result[0].object.matrixWorld)
//         worldNormal.copy(result[0].face.normal).applyMatrix3(normalMatrix).normalize()
//         mesh.lookAt(worldNormal.clone().add(result[0].point))

//         if (isNavPoint(result[0].object)) {
//           setHoveredNav(result[0].object)
//           result[0].object.fadeIn()
//         } else {
//           hoveredNav?.fadeOut()
//         }

//         setPointerMesh({ position })
//       }
//     }

//     eventSystem.addListener(EventType.GlobalPointerMove, handler)

//     return () => {
//       eventSystem.removeListener(EventType.GlobalPointerMove, handler)
//     }
//   }, [camera, eventSystem, hoveredNav, raycaster, scene])

//   const material = useMemo(() => {
//     const m = new MeshBasicMaterial({
//       map: circle,
//       opacity: 0.5,
//       transparent: true,
//       depthTest: false,
//       depthWrite: false,
//     })

//     return m
//   }, [circle])

//   return (
//     <>
//       <mesh {...pointerMesh} material={material} scale={20} ref={ref} renderOrder={1}>
//         <planeGeometry args={[1, 1]}/>
//       </mesh>
//     </>
//   )
// }
