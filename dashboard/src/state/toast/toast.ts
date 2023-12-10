import { createEvent, createStore, sample } from 'effector';

export type Toast = {
  type: 'ERROR' | 'SUCCESS';
  text?: string;
};

export const addToast = createEvent<Toast>();
export const popToast = createEvent();

export const $activeToast = createStore<Toast | null>(null);
export const $toastsQueue = createStore<Toast[]>([]).on(
  addToast,
  (state, toast) => [...state, toast],
);

// sample({
//   clock: addToast,
//   source: {
//     toast: $activeToast,
//   },
//   filter: ({ toast }) => {
//     return !toast;
//   },
//   target: popToast,
// });

sample({
  clock: popToast,
  source: {
    toasts: $toastsQueue,
  },
  fn: ({ toasts }) => {
    if (toasts.length) {
      const t = toasts[0];

      return t;
    }

    return null;
  },
  target: $activeToast,
});

sample({
  clock: popToast,
  source: {
    toasts: $toastsQueue,
  },
  fn: ({ toasts }) => {
    if (toasts.length) {
      toasts.splice(0, 1);

      return [...toasts];
    }

    return [];
  },
  target: $toastsQueue,
});

let prevExecute = performance.now();

const SHOW_TIME = 4000;

setInterval(() => {
  if (
    !$toastsQueue.getState().length &&
    $activeToast.getState() &&
    performance.now() - prevExecute >= SHOW_TIME
  ) {
    popToast();
  }
  if (!$toastsQueue.getState().length) return;

  if (performance.now() - prevExecute >= SHOW_TIME) {
    popToast();
    prevExecute = performance.now();
  }
}, 50);
