import { createEffect, createEvent, createStore, sample } from 'effector';
import { Location } from './types';
import {
  createLocation,
  getLocationById,
  getLocations,
  updateArchive,
  updateLocationById,
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

$currentLocation.on(updateLocation, (state, data) => {
  if (!state) return null;

  return { ...state, ...data };
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
