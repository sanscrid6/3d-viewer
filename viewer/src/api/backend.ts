import {
  CreateLocationRequest,
  DurationStatRequest,
  LocationResponce,
  LocationsResponce,
  LoginRequest,
  LoginResponce,
  RegisterRequest,
  RegisterResponce,
  UpdateArchiveRequest,
  UpdateLocationRequest,
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

export function reportDurationStats(req: DurationStatRequest) {
  return request<LocationResponce>({
    method: 'POST',
    url: `/duration-stat`,
    body: req,
  });
}
