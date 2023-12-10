type Point = {
  x: number;
  y: number;
  z: number;
  number: number;
};

export type Location = {
  name: string;
  description: string;
  points: Point[];
};
