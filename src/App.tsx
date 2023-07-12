import React from 'react';
import './App.css';
import Header from './component/Header';
import Footer from './component/Footer';
import Container from './component/Container';
import { Provider, sharedStore, useStore, Store } from './store/context';
import { createStore } from 'zustand';

function App() {
  return (
    <div>
      <Provider createStore={sharedStore}>
        <div className="card">
          <Header />
          <Container />
          <Footer />
        </div>
      </Provider>
      <Other />
    </div>
  );
}

export function App1() {
  const name = 'a';
  return (
    <div>
      <Provider
        createStore={() =>
          createStore<Store>((set, get) => ({
            name: name,
            count: 0,
            increaseCount: (count: number) => {
              set((state) => {
                return {
                  count: state.count + count
                };
              });
            },
            asyncIncreaseCount: async (count: number) => {
              setTimeout(() => {
                set((state) => {
                  return {
                    count: state.count + count
                  };
                });
              }, 2000);
            },
            getNearFive: () => {
              const count = get().count;
              const value =
                count % 5 < 3 ? count - (count % 5) : count + 5 - (count % 5);
              set({ count: value });
            }
          }))
        }
      >
        <div className="card">
          <Header />
          <Container />
          <Footer />
        </div>
      </Provider>
      <Other />
    </div>
  );
}

export default App;

const Other: React.FC = () => {
  try {
    const store = useStore();
    return <div>{store.name ?? ''}</div>;
  } catch (error) {
    // 会报错
    return <div>error</div>;
  }
};
