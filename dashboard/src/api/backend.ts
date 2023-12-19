import {
  CreateLocationRequest,
  GetLocationStatsResponce,
  GetUserRequest,
  GetUserResponse,
  LocationResponce,
  LocationsResponce,
  LoginRequest,
  LoginResponce,
  RegisterRequest,
  RegisterResponce,
  UpdateArchiveRequest,
  UpdateImageRequest,
  UpdateLocationRequest,
  UpdateUserRequest,
} from './types';
import { request } from './utils';

export function login(req: LoginRequest) {
  return request<LoginResponce>({
    method: 'POST',
    url: '/auth/login',
    body: req,
  });
}

export function register(req: RegisterRequest) {
  return request<RegisterResponce>({
    method: 'POST',
    url: '/auth/register',
    body: req,
  });
}

export function getLocations() {
  return request<LocationsResponce>({
    method: 'GET',
    url: '/location',
  });
}

export function createLocation(req: CreateLocationRequest) {
  return request({
    method: 'POST',
    url: '/location',
    body: req,
  });
}

export function getLocationById(id: string) {
  return request<LocationResponce>({
    method: 'GET',
    url: `/location/${id}`,
  });
}

export function updateLocationById(req: UpdateLocationRequest) {
  return request<LocationResponce>({
    method: 'PATCH',
    url: `/location/${req.id}`,
    body: req,
  });
}

export function updateArchive(req: UpdateArchiveRequest) {
  const fd = new FormData();
  fd.append('archive', req.archive);

  return request<LocationResponce>({
    method: 'POST',
    url: `/location/archive/${req.id}`,
    body: fd,
  });
}

export function getLocationStats(locationId: string) {
  return request<GetLocationStatsResponce>({
    method: 'GET',
    url: `/duration-stat/${locationId}`,
  });
}

export function updateUser(req: UpdateUserRequest) {
  return request({
    method: 'PATCH',
    url: `/users/${req.id}`,
    body: req,
  });
}

export function getUser(req: GetUserRequest) {
  return request<GetUserResponse>({
    method: 'GET',
    url: `/users/${req.id}`,
  });
}

export function updatePreview(req: UpdateImageRequest) {
  const fd = new FormData();
  fd.append('image', req.image);

  return request<LocationResponce>({
    method: 'POST',
    url: `/location/preview/${req.id}`,
    body: fd,
  });
}
