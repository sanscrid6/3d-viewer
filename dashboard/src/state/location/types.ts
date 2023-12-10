export type Location = {
  id: string;
  name: string;
  description: string;
  previewUrl?: string;
};

export type LocationStats = {
  unique: number;
  sumDuration: number;
};
