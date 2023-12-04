import { createStore } from 'zustand'
import { createContext } from 'react'
import { initialState } from '../initialState'
import type { Store } from '../createStore'

export function createBearStore() {
  return createStore<Store>((set, get) => ({
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
      const value
        = count % 5 < 3 ? count - (count % 5) : count + 5 - (count % 5)
      set({ count: value })
    },
  }))
}

export type BearStore = ReturnType<typeof createBearStore>
export const BearContext = createContext<BearStore | null>(null)
