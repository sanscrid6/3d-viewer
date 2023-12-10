import { createEffect, createEvent, createStore, sample } from 'effector';
import { Location, LocationStats } from './types';
import {
  createLocation,
  getLocationById,
  getLocationStats,
  getLocations,
  updateArchive,
  updateLocationById,
  updatePreview,
} from '../../api/backend';
import { addToast } from '../toast/toast';

export const $locations = createStore<Location[]>([]);
export const getLocationsFx = createEffect(getLocations);
export const addLocationFx = createEffect(createLocation);

export const $currentLocation = createStore<Location | null>(null);
export const setCurrentLocation = createEvent<Location | null>();

export const updateLocation =
  createEvent<Partial<Pick<Location, 'description' | 'name'>>>();

export const getCurrentLocationFx = createEffect(getLocationById);

export const updateLocationFx = createEffect(updateLocationById);
export const updateArchiveFx = createEffect(updateArchive);

export const getLocationStatsFx = createEffect(getLocationStats);
export const $locationStats = createStore<LocationStats | null>(null);

export const updatePreviewFx = createEffect(updatePreview);

$currentLocation.on(updateLocation, (state, data) => {
  if (!state) return null;

  return { ...state, ...data };
});

sample({
  clock: updatePreviewFx.doneData,
  source: {
    currentLocation: $currentLocation,
  },
  fn: ({ currentLocation }) => currentLocation!.id,
  target: getCurrentLocationFx,
});

sample({
  clock: getCurrentLocationFx.doneData,
  fn: ({ id }) => id,
  target: getLocationStatsFx,
});

sample({
  clock: getLocationStatsFx.doneData,
  target: $locationStats,
});

sample({
  clock: [updateArchiveFx.failData, updateLocationFx.failData],
  fn: (e) => {
    return { type: 'ERROR' as const, text: e.message };
  },
  target: addToast,
});

sample({
  clock: [updateArchiveFx.doneData, updateLocationFx.doneData],
  fn: () => {
    return { type: 'SUCCESS' as const };
  },
  target: addToast,
});

sample({
  clock: getLocationsFx.doneData,
  target: $locations,
});

sample({
  clock: addLocationFx.doneData,
  target: getLocationsFx,
});

sample({
  clock: getCurrentLocationFx.doneData,
  target: $currentLocation,
});

sample({
  clock: setCurrentLocation,
  target: $currentLocation,
});
