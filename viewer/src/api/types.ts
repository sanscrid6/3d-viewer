import { Location } from '../state/location/types';

type Credentials = {
  email: string;
  password: string;
};

type Jwt = {
  accessToken: string;
  userId: string;
  email: string;
};

export type LoginRequest = Credentials;
export type LoginResponce = Jwt;

export type RegisterRequest = Credentials;
export type RegisterResponce = Jwt;

export type LocationsResponce = Location[];

export type CreateLocationRequest = {
  name: string;
  description?: string;
};

export type LocationResponce = Location;
export type UpdateLocationRequest = Partial<CreateLocationRequest> & {
  id: string;
};

export type UpdateArchiveRequest = {
  id: string;
  archive: Blob;
};

export type DurationStatRequest = {
  locationId: string;
  pointNumber: number;
  duration: number;
};
