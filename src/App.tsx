import React from 'react';
import './App.css';
import Header from './component/Header';
import Footer from './component/Footer';
import Container from './component/Container';
import { Provider, sharedStore, useStore } from './store/context';

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
      <Provider createStore={() => sharedStore(name)}>
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
