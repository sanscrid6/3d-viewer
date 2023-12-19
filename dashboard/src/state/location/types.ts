export type Location = {
  id: string;
  name: string;
  description: string;
  previewUrl?: string;
  isPublic: boolean;
};

export type LocationStats = {
  unique: number;
  sumDuration: number;
};
