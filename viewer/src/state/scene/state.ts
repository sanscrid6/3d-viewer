import { createStore } from 'effector'
import { Euler, Vector3 } from 'three'

export const navPoints = createStore<any>([])
export const cursor = createStore({ position: new Vector3(), rotation: new Euler() })
