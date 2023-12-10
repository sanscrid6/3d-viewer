import { createEffect, createEvent, createStore, sample } from 'effector';
import { User } from './types';
import { login, register } from '../../api/backend';

export const $user = createStore<User | null>(null);

export const setUser = createEvent<User>();

export const loginFx = createEffect(login);
export const registerFx = createEffect(register);
export const getUserFx = createEffect();

export const logOut = createEvent();

loginFx.doneData.watch(({ accessToken, userId }) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('userId', userId);
});

registerFx.doneData.watch(({ accessToken, userId }) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('userId', userId);
});

sample({
  clock: setUser,
  target: $user,
});

sample({
  clock: logOut,
  fn: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');

    return null;
  },
  target: $user,
});

sample({
  clock: [loginFx.doneData, registerFx.doneData],
  fn: ({ userId }) => {
    console.log(userId);

    return {
      id: userId,
    };
  },
  target: $user,
});
