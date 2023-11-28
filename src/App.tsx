import React, { useRef } from 'react';
import { BearContext, createBearStore } from './store/context/react_context';
import Main from './component/Main';
import ContextMain from './component/ContextMain';

function App() {
  const store = useRef(createBearStore()).current;
  return (
    <div>
      <BearContext.Provider value={store}>
        <ContextMain />
      </BearContext.Provider>
      <Main />
    </div>
  );
}

export default App;
