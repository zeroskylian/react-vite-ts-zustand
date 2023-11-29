import type { Store } from './createStore';

export const isOdd = (s: Store) => {
  return s.count % 2 == 0;
};

export const getName = (state: Store) => {
  return state.name;
};

export const getFooter = (state: Store) => {
  return state.footer;
};

export const getStore = (state: Store) => {
  return state;
};

export const getCount = (state: Store) => {
  return state.count;
};
