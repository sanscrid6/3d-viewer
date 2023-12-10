import { createEffect, createStore, sample } from 'effector';
import { Location } from './types';
import { getLocationById } from '../../api/backend';

export const $location = createStore<Location | null>(
  null as unknown as Location,
);

export const getLocationFx = createEffect(getLocationById);

export const $params = createStore({
  locationId: new URL('' + window.location).searchParams.get('locationId'),
});

sample({
  clock: getLocationFx.doneData,
  target: $location,
});
