import type { Store } from './createStore';

export const isOdd = (s: Store) => {
  return s.count % 2 == 0;
};

export const getName = (state: Store) => {
  return state.name;
};
