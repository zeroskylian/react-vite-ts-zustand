import { shallow } from 'zustand/shallow'
import { useStoreWithEqualityFn } from 'zustand/traditional'
import { useStore } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import { useStore as store } from './createStore'
import type { Store } from './createStore'

export function useAppStore<T>(
  selector: (state: Store) => T,
  equals?: (a: T, b: T) => boolean,
): T {
  return useStoreWithEqualityFn(store, selector, equals)
}

export function useShallowAppStore<T>(selector: (state: Store) => T): T {
  return useStoreWithEqualityFn(store, selector, shallow)
}

export function useDefualtShallAppStore<T>(selector: (state: Store) => T): T {
  return useStore(store, useShallow(selector))
}
