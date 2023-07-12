import React, { useRef, PropsWithChildren, useContext } from 'react';
import { createBearStore, BearContext, BearStore } from './react_context';
import { useStore } from 'zustand';

export const Provider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<BearStore>();
  if (!storeRef.current) {
    storeRef.current = createBearStore();
  }
  return (
    <BearContext.Provider value={storeRef.current}>
      {children}
    </BearContext.Provider>
  );
};

export const Consumer = () => {
  const storeApi = useContext(BearContext);
  if (!storeApi) throw new Error('Missing TestContext.Provider in the tree');
  const setKey = useStore(storeApi, (state) => state.increaseCount);
  const key = useStore(storeApi, (state) => state.count);
  return (
    <div>
      <button type="button" onClick={() => setKey(1)}>
        Set Key
      </button>
      <div>Key: {key}</div>
    </div>
  );
};
