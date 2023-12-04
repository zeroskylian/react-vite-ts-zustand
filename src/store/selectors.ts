import type { Store } from './createStore'

export function isOdd(s: Store) {
  return s.count % 2 === 0
}

export function getName(state: Store) {
  return state.name
}

export function getFooter(state: Store) {
  return state.footer
}

export function getStore(state: Store) {
  return state
}

export function getCount(state: Store) {
  return state.count
}
