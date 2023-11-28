import React, { useRef } from 'react';
import { BearContext, createBearStore } from './store/context/react_context';
import Main from './component/Main';

function App() {
  const store = useRef(createBearStore()).current;
  return (
    <div>
      <BearContext.Provider value={store}>
        <Main />
      </BearContext.Provider>
    </div>
  );
}

export default App;
