import './App.css';
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

function App() {
  const store = useStore();
  return (
    <>
      <div className="card">
        <p>{store.name}</p>
        <button onClick={() => store.increaseCount(2)}>
          count is {store.count}
        </button>
      </div>
    </>
  );
}

export default App;
