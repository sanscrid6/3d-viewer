export type Gltf = {
  asset: Asset;
  scene: number;
  scenes: Scene[];
  nodes: Node[];
  meshes: Mesh[];
  accessors: Accessor[];
  bufferViews: BufferView[];
  buffers: Buffer[];
  materials: Material[];
  textures: Texture[];
  images: Image[];
  samplers: Sampler[];
};

export type Accessor = {
  bufferView: number;
  componentType: number;
  count: number;
  type: Type;
  name: Name;
  max?: number[];
  min?: number[];
  byteOffset?: number;
};

export enum Name {
  AccessorColors = 'accessorColors',
  AccessorIndices = 'accessorIndices',
  AccessorNormals = 'accessorNormals',
  AccessorPositions = 'accessorPositions',
  AccessorUV2S = 'accessorUV2s',
  AccessorUVs = 'accessorUVs',
}

export enum Type {
  Scalar = 'SCALAR',
  Vec2 = 'VEC2',
  Vec3 = 'VEC3',
  Vec4 = 'VEC4',
}

export type Asset = {
  version: string;
  generator: string;
};

export type BufferView = {
  buffer: number;
  byteLength: number;
  name: string;
  byteOffset?: number;
  byteStride?: number;
};

export type Buffer = {
  uri: string;
  byteLength: number;
};

export type Image = {
  uri: string;
};

export type Material = {
  pbrMetallicRoughness: PbrMetallicRoughness;
  emissiveFactor: number[];
  alphaMode: string;
  name: string;
};

export type PbrMetallicRoughness = {
  baseColorFactor: number[];
  baseColorTexture: BaseColorTexture;
  metallicFactor: number;
  roughnessFactor: number;
};

export type BaseColorTexture = {
  index: number;
  texCoord: number;
};

export type Mesh = {
  primitives: Primitive[];
  name: string;
};

export type Primitive = {
  attributes: Attributes;
  indices: number;
  mode?: number;
  material?: number;
};

export type Attributes = {
  POSITION: number;
  NORMAL: number;
  COLOR_0?: number;
  TEXCOORD_0: number;
  TEXCOORD_1?: number;
};

export type Node = {
  mesh?: number;
  translation: number[];
  rotation: number[];
  scale: number[];
  name: string;
};

export type Sampler = {
  magFilter: number;
  minFilter: number;
  wrapS: number;
  wrapT: number;
};

export type Scene = {
  nodes: number[];
  extensions: Extensions;
};

export type Extensions = {};

export type Texture = {
  sampler: number;
  source: number;
  name: string;
};
