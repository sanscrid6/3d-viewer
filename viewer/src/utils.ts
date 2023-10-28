import { type Mesh } from 'three'

export function isMesh (mesh: any): mesh is Mesh {
  return mesh.isMesh
}
