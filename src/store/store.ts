import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface BearState {
  name: string;
  count: number;
  increaseCount: (by: number) => void;
}

export const useStore = create<BearState>()(
  devtools((set) => {
    return {
      name: 'antd',
      count: 0,
      increaseCount: (count: number) => {
        set((state) => {
          return {
            count: state.count + count
          };
        });
      }
    };
  })
);

export default useStore;