// import { Gltf, OrbitControls, useTexture } from '@react-three/drei'
// import { useFrame, useThree } from '@react-three/fiber'
// import { useCallback, useEffect, useMemo, useState } from 'react'
// import { Vector3, Euler, MathUtils, Vector2 } from 'three'
// import { isGroup, isMesh, raycastFromScreen } from './utils'
// import { type OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/Addons.js'
// import { useStore } from 'effector-react'
// import { $eventSystem } from './state/event-system/event-system.state'
// import { EventType } from './EventSystem'
// import { NavPoint } from './viewer/NavPoint'
// import { Box } from './viewer/ViewBox'
// // import * as TWEEN from '@tweenjs/tween.js'
// import TWEEN from 'three/examples/jsm/libs/tween.module.js'

// const scale = 100
// const size = 1 * scale
// const path1 = '/LiveOak/location.gltf'
// const transitionTime = 3000

// // стейт фейд поворот камеры при переходе спрятать навигационные точки
// //

// type Pos = {
//   position: Vector3,
//   index: number
// }

// export function Scene () {
//   const scene = useThree(state => state.scene)
//   const controls = useThree(state => state.controls as OrbitControlsImpl)
//   const clock = useThree(state => state.clock)
//   const raycaster = useThree(state => state.raycaster)
//   const camera = useThree(state => state.camera)

//   const [navPoints, setNavPoints] = useState<NavPoint[]>([])
//   const [loaded, setLoaded] = useState(false)
//   const [points, setPoints] = useState([] as Vector3[])
//   const [currPoint, setCurrPoint] = useState({
//     position: new Vector3(),
//     index: 0
//   })
//   const [nextPoint, setNextPoint] = useState<Pos | null>(null)
//   const [opacity, setOpacity] = useState(1)

//   const eventSystem = useStore($eventSystem)

//   useFrame((state, delta) => {
//     TWEEN.update(state.clock.elapsedTime * 1000)
//   })

//   // const [back, front, left, right, top, bottom] = useLoader(TextureLoader, [
//   //   `LiveOak/cube/${currPoint.index + 1}_cubeback.jpg`,
//   //   `LiveOak/cube/${currPoint.index + 1}_cubefront.jpg`,
//   //   `LiveOak/cube/${currPoint.index + 1}_cubeleft.jpg`,
//   //   `LiveOak/cube/${currPoint.index + 1}_cuberight.jpg`,
//   //   `LiveOak/cube/${currPoint.index + 1}_cubeup.jpg`,
//   //   `LiveOak/cube/${currPoint.index + 1}_cubedown.jpg`
//   // ], (e) => {console.log(e)})

//   const [back, front, left, right, top, bottom] = useTexture([
//     `LiveOak/cube/${currPoint.index + 1}_cubeback.jpg`,
//     `LiveOak/cube/${currPoint.index + 1}_cubefront.jpg`,
//     `LiveOak/cube/${currPoint.index + 1}_cubeleft.jpg`,
//     `LiveOak/cube/${currPoint.index + 1}_cuberight.jpg`,
//     `LiveOak/cube/${currPoint.index + 1}_cubeup.jpg`,
//     `LiveOak/cube/${currPoint.index + 1}_cubedown.jpg`
//   ])

//   const [backNext, frontNext, leftNext, rightNext, topNext, bottomNext] = useTexture(nextPoint ? [
//     `LiveOak/cube/${nextPoint.index + 1}_cubeback.jpg`,
//     `LiveOak/cube/${nextPoint.index + 1}_cubefront.jpg`,
//     `LiveOak/cube/${nextPoint.index + 1}_cubeleft.jpg`,
//     `LiveOak/cube/${nextPoint.index + 1}_cuberight.jpg`,
//     `LiveOak/cube/${nextPoint.index + 1}_cubeup.jpg`,
//     `LiveOak/cube/${nextPoint.index + 1}_cubedown.jpg`
//   ]: [])

//   useEffect(() => {
//     setNavPointVisibility()
//   }, [navPoints])

//   const setNavPointVisibility = useCallback(() => {
//     // const navPoints = scene.children.filter(m => m.name.startsWith('Point'))
//     console.log(navPoints.length)

//     for (let i = 0; i < navPoints.length; i++) {
//       const direction = camera.position.clone().sub(navPoints[i].position.clone()).normalize()
//       raycaster.set(navPoints[i].position.clone(), direction)
//       const dist = navPoints[i].position.clone().distanceTo(camera.position)
//       const result = raycaster.intersectObjects(scene.children, true)
//         .filter(o => !o.object.userData.ignoreRaycast)
//         .filter(o => o.distance < dist)
//       navPoints[i].visible = result.length === 0
//     }
//   }, [camera.position, navPoints, raycaster, scene.children])

//   // загрузка сцены
//   useEffect(() => {
//     if (loaded) return

//     if (scene && controls) {
//       setLoaded(true)
//     } else {
//       return
//     }
//     scene.name = 'location1'
//     const root = scene.children.filter(isGroup)[0]
//     const meshes = root.children.filter(isMesh)
//     const spheres = meshes.filter(m => m.name.startsWith('Sphere'))
//     const triggers = meshes.filter(m => m.name.startsWith('Trigger'))
//     meshes.forEach(m => {
//       if (!Array.isArray(m.material)) {
//         m.visible = false
//       }
//     })

//     triggers.forEach(s => {
//       root.remove(s)

//       return 1
//     })

//     spheres.forEach(s => {
//       root.remove(s)
//     })

//     const pointPositions = []
//     const pointMeshes = []
//     for (let i = 0; i < spheres.length; i++) {
//       const s = spheres[i]

//       raycaster.set(s.position, new Vector3(0, -1, 0))
//       const intersect = raycaster.intersectObjects(scene.children)
//       const index = +s.name.slice(6)

//       pointPositions.push({ position: s.position.clone(), index })

//       const pointMesh = new NavPoint(intersect[0].point)
//       pointMeshes.push(pointMesh)
//       scene.add(pointMesh)
//     }
//     console.log(scene.children.length)

//     pointPositions.sort((a, b) => a.index - b.index)

//     setPoints(pointPositions.map(p => p.position))
//     setNavPoints(pointMeshes)

//     const point = spheres.find(q => q.name === 'Sphere1')!
//     setCurrPoint({
//       position: point.position.clone(),
//       index: 0
//     })

//     camera.position.set(point.position.x, point.position.y, point.position.z)
//     controls.target = point.position.clone().add(new Vector3(0.01, 0, 0))
//     controls.update()
//     // точки не отрендерились еще нужно классы а не жсикс
//     setNavPointVisibility()
//   }, [scene, controls, clock, raycaster, loaded, setNavPointVisibility, camera.position])

//   // ходьба
//   useEffect(() => {
//     function handler (e: MouseEvent) {
//       const result = raycastFromScreen(raycaster, camera, new Vector2(e.clientX, e.clientY), scene.children)

//       const pos = result[0].point

//       const point = points.reduce((acc, curr, index) => {
//         if (acc.pos.distanceTo(pos) > curr.distanceTo(pos)) {
//           return { pos: curr, index }
//         }

//         return acc
//       }, { pos: new Vector3(Infinity, Infinity, Infinity), index: 0 })

//       // setCurrPoint({
//       //   position: point.pos.clone(),
//       //   index: point.index
//       // })
//       const coords = {x: 0, y: 0} 

//       setNextPoint({
//         position: point.pos.clone(),
//         index: point.index
//       })
     
//       // console.log(scene)

//       // const tween = new TWEEN.Tween({x: 0, y: 0}) // Create a new tween that modifies 'coords'.
//       // .to({x: 300, y: 200}, 10000) // Move to (300, 200) in 1 second.
//       // .easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function to make the animation smooth.
//       // .onUpdate(() => {
//       //   console.log('up')
//       //   // console.log('update,', coords)
//       //   // Called after tween.js updates 'coords'.
//       //   // Move 'box' to the position described by 'coords' with a CSS translation.
//       //   // box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)')
//       // })   
//       // .onComplete(() => {
//       //   console.log('end')
//       // })
//       // .start() // Start the tween immediately.
      
//       const t = new TWEEN.Tween(currPoint.position.clone()).to(point.pos.clone(), transitionTime).onUpdate((obj) => {
//         console.log(scene)
//         setCurrPoint(prev => ({
//           ...prev,
//           position: obj
//         }))
//       }).onComplete(() => {
//         setCurrPoint(prev => ({
//           ...prev,
//           index: point.index,
//         }))
//         setNextPoint(null)
//       }).start()

//       // const l = new TWEEN.Tween({lerp: 1})
//       // .to({lerp: 0}, transitionTime)
//       // .onUpdate(({lerp}) => {
//       //   setOpacity(lerp)
//       // }).onComplete(() => {
//       //   setOpacity(1)
//       // }).start()

//       // setTween(tween)

//       const lookAt = new Vector3()
//       lookAt.applyEuler(camera.rotation)
//       const rotation = camera.rotation.clone()
//       camera.position.set(point.pos.x, point.pos.y, point.pos.z)
//       controls.target = point.pos.clone().add(new Vector3(0.01, 0, 0))

//       controls.update()
//       // console.log(rotation)
//       // camera.rotation.set(rotation.x, MathUtils.degToRad(180), rotation.z)

//       // controls.update()

//       // on move end
//       setNavPointVisibility()
//     }

//     eventSystem.addListener(EventType.GlobalPonterClick, handler)

//     return () => {
//       eventSystem.removeListener(EventType.GlobalPonterClick, handler)
//     }
//   }, [camera, controls, eventSystem, points, raycaster, scene.children, setNavPointVisibility])

//   const nextSides = useMemo(() => {
//     return [
//       {
//         position: new Vector3(0, 0, -size / 2),
//         texture: frontNext,
//         rotation: new Euler(),
//         key: 'front'
//       },
//       {
//         position: new Vector3( -size / 2, 0,0),
//         texture: leftNext,
//         rotation: new Euler(0, MathUtils.degToRad(90), 0),
//         key: 'left'
//       },
//       {
//         position: new Vector3(size / 2, 0,0),
//         texture: rightNext,
//         rotation: new Euler(0, MathUtils.degToRad(-90), 0),
//         key: 'right'
//       },
//       {
//         position: new Vector3(0, 0, size / 2),
//         texture: backNext,
//         rotation: new Euler(0, MathUtils.degToRad(180), 0),
//         key: 'back'
//       },
//       {
//         position: new Vector3(0, size / 2, 0),
//         texture: topNext,
//         rotation: new Euler(MathUtils.degToRad(90), 0, MathUtils.degToRad(90)),
//         key: 'top'
//       },
//       {
//         position: new Vector3(0,  - size / 2, 0),
//         texture: bottomNext,
//         rotation: new Euler(MathUtils.degToRad(-90), 0, MathUtils.degToRad(-90)),
//         key: 'bottom'
//       },
//     ]
//   }, [backNext, frontNext, leftNext, rightNext, topNext, bottomNext])


//   const sides = useMemo(() => {
//     return [
//       {
//         position: new Vector3(0, 0, -size / 2),
//         texture: front,
//         rotation: new Euler(),
//         key: 'front'
//       },
//       {
//         position: new Vector3( -size / 2, 0,0),
//         texture: left,
//         rotation: new Euler(0, MathUtils.degToRad(90), 0),
//         key: 'left'
//       },
//       {
//         position: new Vector3(size / 2, 0,0),
//         texture: right,
//         rotation: new Euler(0, MathUtils.degToRad(-90), 0),
//         key: 'right'
//       },
//       {
//         position: new Vector3(0, 0, size / 2),
//         texture: back,
//         rotation: new Euler(0, MathUtils.degToRad(180), 0),
//         key: 'back'
//       },
//       {
//         position: new Vector3(0, size / 2, 0),
//         texture: top,
//         rotation: new Euler(MathUtils.degToRad(90), 0, MathUtils.degToRad(90)),
//         key: 'top'
//       },
//       {
//         position: new Vector3(0,  - size / 2, 0),
//         texture: bottom,
//         rotation: new Euler(MathUtils.degToRad(-90), 0, MathUtils.degToRad(-90)),
//         key: 'bottom'
//       },
//     ]
//   }, [back, front, left, right, top, bottom])

//   return (
//     <>
//       <Gltf
//         src={path1}
//         position={new Vector3(0, 0, 0)}
//         scale={1}
        
//       />
//       <OrbitControls
//         makeDefault
//         enableDamping={true}
//       />
//       {/* <ambientLight intensity={1} /> */}
//       {/* {nextPoint && <Box opacity={1 - opacity} scale={scale} sides={nextSides} position={nextPoint.position}/>} */}
//       <Box opacity={opacity} scale={scale} sides={sides} position={currPoint.position}/>
//     </>
//   )
// }
