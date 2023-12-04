import { shallow } from 'zustand/shallow'
import { useStoreWithEqualityFn } from 'zustand/traditional'
import { appStore } from './createStore'
import type { Store } from './createStore'

export function useAppStore<T>(
  selector: (state: Store) => T,
  equals?: (a: T, b: T) => boolean,
): T {
  return useStoreWithEqualityFn(appStore, selector, equals)
}

export function useShallowAppStore<T>(selector: (state: Store) => T): T {
  return useStoreWithEqualityFn(appStore, selector, shallow)
}
