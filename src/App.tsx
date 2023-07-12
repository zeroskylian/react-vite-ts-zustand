import React, { useRef, useContext } from 'react';
import { useStore } from 'zustand';
import './App.css';
import Header from './component/Header';
import Footer from './component/Footer';
import Container, { Container1 } from './component/Container';
import { BearContext, createBearStore } from './store/context/react_context';

function App() {
  const store = useRef(createBearStore()).current;
  return (
    <div>
      <BearContext.Provider value={store}>
        <div className="card">
          <Header />
          <Container />
          <Container1 />
          <Footer />
        </div>
      </BearContext.Provider>
      <Other />
    </div>
  );
}

export default App;

const Other: React.FC = () => {
  try {
    const store = useContext(BearContext);
    if (!store) throw new Error('Missing BearContext.Provider in the tree');
    const bears = useStore(store, (s) => s.name);
    return <div>{bears ?? ''}</div>;
  } catch (error) {
    // 会报错
    return <div>error</div>;
  }
};
