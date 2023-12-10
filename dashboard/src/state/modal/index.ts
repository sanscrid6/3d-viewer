import { createEvent, createStore, sample } from 'effector';
import { ModalType } from './types';

export const $modal = createStore<{ type: ModalType; data?: unknown } | null>(
  null,
);

export const openModal = createEvent<{ type: ModalType; data?: unknown }>();
export const closeModal = createEvent();

sample({
  clock: openModal,
  target: $modal,
});

sample({
  clock: closeModal,
  fn: () => null,
  target: $modal,
});
