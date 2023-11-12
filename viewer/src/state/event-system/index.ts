import { createStore } from 'effector'
import { EventSystem } from './EventSystem'

export const $eventSystem = createStore(new EventSystem())
