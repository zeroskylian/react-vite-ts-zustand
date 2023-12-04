import { createStore } from 'zustand'
import type { State } from './initialState'
import { initialState } from './initialState'

export interface Action {
  increaseCount: (by: number) => void
  asyncIncreaseCount: (by: number) => void
  getNearFive: () => void
}

export type Store = State & Action

export const useStore = createStore<Store>((set, get) => ({
  ...initialState,
  increaseCount: (count: number) => {
    set((state) => {
      return {
        count: state.count + count,
      }
    })
  },
  asyncIncreaseCount: async (count: number) => {
    setTimeout(() => {
      set((state) => {
        return {
          count: state.count + count,
        }
      })
    }, 2000)
  },
  getNearFive: () => {
    const count = get().count
    const value = count % 5 < 3 ? count - (count % 5) : count + 5 - (count % 5)
    set({ count: value })
  },
}))
