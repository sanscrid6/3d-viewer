import { Gltf, OrbitControls, Image, useTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useCallback, useEffect, useState } from 'react'
import { Vector3, Euler, MathUtils, Vector2 } from 'three'
import { isGroup, isMesh, raycastFromScreen } from './utils'
import { type OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/Addons.js'
import { useStore } from 'effector-react'
import { $eventSystem } from './state/event-system/event-system.state'
import { EventType } from './EventSystem'
import { NavPoint } from './NavPoint'

const scale = 100
const size = 1 * scale
const path1 = '/LiveOak/location.gltf'

// стейт фейд поворот камеры при переходе спрятать навигационные точки
//

export function Scene () {
  const scene = useThree(state => state.scene)
  const controls = useThree(state => state.controls as OrbitControlsImpl)
  const clock = useThree(state => state.clock)
  const raycaster = useThree(state => state.raycaster)
  const camera = useThree(state => state.camera)

  const [navPoints, setNavPoints] = useState<NavPoint[]>([])
  const [loaded, setLoaded] = useState(false)
  const [points, setPoints] = useState([] as Vector3[])
  const [currPoint, setCurrPoint] = useState({
    position: new Vector3(),
    index: 0
  })

  const eventSystem = useStore($eventSystem)

  // const [back, front, left, right, top, bottom] = useLoader(TextureLoader, [
  //   `LiveOak/cube/${currPoint.index + 1}_cubeback.jpg`,
  //   `LiveOak/cube/${currPoint.index + 1}_cubefront.jpg`,
  //   `LiveOak/cube/${currPoint.index + 1}_cubeleft.jpg`,
  //   `LiveOak/cube/${currPoint.index + 1}_cuberight.jpg`,
  //   `LiveOak/cube/${currPoint.index + 1}_cubeup.jpg`,
  //   `LiveOak/cube/${currPoint.index + 1}_cubedown.jpg`
  // ], (e) => {console.log(e)})

  const [back, front, left, right, top, bottom] = useTexture([
    `LiveOak/cube/${currPoint.index + 1}_cubeback.jpg`,
    `LiveOak/cube/${currPoint.index + 1}_cubefront.jpg`,
    `LiveOak/cube/${currPoint.index + 1}_cubeleft.jpg`,
    `LiveOak/cube/${currPoint.index + 1}_cuberight.jpg`,
    `LiveOak/cube/${currPoint.index + 1}_cubeup.jpg`,
    `LiveOak/cube/${currPoint.index + 1}_cubedown.jpg`
  ], () => { console.log('load') })

  useEffect(() => {
    setNavPointVisibility()
  }, [navPoints])

  const setNavPointVisibility = useCallback(() => {
    // const navPoints = scene.children.filter(m => m.name.startsWith('Point'))
    console.log(navPoints.length)

    for (let i = 0; i < navPoints.length; i++) {
      const direction = camera.position.clone().sub(navPoints[i].position.clone()).normalize()
      raycaster.set(navPoints[i].position.clone(), direction)
      const dist = navPoints[i].position.clone().distanceTo(camera.position)
      const result = raycaster.intersectObjects(scene.children, true)
        .filter(o => !o.object.userData.ignoreRaycast)
        .filter(o => o.distance < dist)
      navPoints[i].visible = result.length === 0
    }
  }, [camera.position, navPoints, raycaster, scene.children])

  // загрузка сцены
  useEffect(() => {
    if (loaded) return

    if (scene && controls) {
      setLoaded(true)
    } else {
      return
    }
    scene.name = 'location1'
    const root = scene.children.filter(isGroup)[0]
    const meshes = root.children.filter(isMesh)
    const spheres = meshes.filter(m => m.name.startsWith('Sphere'))
    const triggers = meshes.filter(m => m.name.startsWith('Trigger'))
    meshes.forEach(m => {
      if (!Array.isArray(m.material)) {
        m.visible = false
      }
    })

    triggers.forEach(s => {
      root.remove(s)

      return 1
    })

    spheres.forEach(s => {
      root.remove(s)
    })

    const pointPositions = []
    const pointMeshes = []
    for (let i = 0; i < spheres.length; i++) {
      const s = spheres[i]

      raycaster.set(s.position, new Vector3(0, -1, 0))
      const intersect = raycaster.intersectObjects(scene.children)
      const index = +s.name.slice(6)

      pointPositions.push({ position: s.position.clone(), index })

      const pointMesh = new NavPoint(intersect[0].point)
      pointMeshes.push(pointMesh)
      scene.add(pointMesh)
    }
    console.log(scene.children.length)

    pointPositions.sort((a, b) => a.index - b.index)

    setPoints(pointPositions.map(p => p.position))
    setNavPoints(pointMeshes)

    const point = spheres.find(q => q.name === 'Sphere1')!
    setCurrPoint({
      position: point.position.clone(),
      index: 0
    })

    camera.position.set(point.position.x, point.position.y, point.position.z)
    controls.target = point.position.clone().add(new Vector3(0.01, 0, 0))
    controls.update()
    // точки не отрендерились еще нужно классы а не жсикс
    setNavPointVisibility()
  }, [scene, controls, clock, raycaster, loaded, setNavPointVisibility, camera.position])

  // ходьба
  useEffect(() => {
    function handler (e: MouseEvent) {
      const result = raycastFromScreen(raycaster, camera, new Vector2(e.clientX, e.clientY), scene.children)

      const pos = result[0].point

      const point = points.reduce((acc, curr, index) => {
        if (acc.pos.distanceTo(pos) > curr.distanceTo(pos)) {
          return { pos: curr, index }
        }

        return acc
      }, { pos: new Vector3(Infinity, Infinity, Infinity), index: 0 })

      setCurrPoint({
        position: point.pos.clone(),
        index: point.index
      })
      console.log(scene)

      const lookAt = new Vector3()
      lookAt.applyEuler(camera.rotation)
      const rotation = camera.rotation.clone()
      camera.position.set(point.pos.x, point.pos.y, point.pos.z)
      controls.target = point.pos.clone().add(new Vector3(0.01, 0, 0))

      controls.update()
      // console.log(rotation)
      // camera.rotation.set(rotation.x, MathUtils.degToRad(180), rotation.z)

      // controls.update()

      // on move end
      setNavPointVisibility()
    }

    eventSystem.addListener(EventType.GlobalPonterClick, handler)

    return () => {
      eventSystem.removeListener(EventType.GlobalPonterClick, handler)
    }
  }, [camera, controls, eventSystem, points, raycaster, scene.children, setNavPointVisibility])

  return (
    <>
      <Gltf
        src={path1}
        position={new Vector3(0, 0, 0)}
        scale={1}
      />
      <OrbitControls
        makeDefault
        enableDamping={true}
      />
      <ambientLight intensity={1} />
      {/* {navPoints} */}
      <Image
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
      />
    </>
  )
}
