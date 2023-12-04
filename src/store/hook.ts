import { shallow } from 'zustand/shallow'
import { useStoreWithEqualityFn } from 'zustand/traditional'
import { useStore } from './createStore'
import type { Store } from './createStore'

export function useAppStore<T>(
  selector: (state: Store) => T,
  equals?: (a: T, b: T) => boolean,
): T {
  return useStoreWithEqualityFn(useStore, selector, equals)
}

export function useShallowAppStore<T>(selector: (state: Store) => T): T {
  return useStoreWithEqualityFn(useStore, selector, shallow)
}
