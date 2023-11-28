import React, { useRef, PropsWithChildren, useContext } from 'react';
import { createBearStore, BearContext, BearStore } from './react_context';
import { useStoreWithEqualityFn } from 'zustand/traditional';
import { Store } from '..';

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

export function useBearContext<T>(
  selector: (state: Store) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  const store = useContext(BearContext);
  if (!store) throw new Error('Missing BearContext.Provider in the tree');
  return useStoreWithEqualityFn(store, selector, equalityFn);
}

/*

/// 举例
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

/// 举例
export const Consumer1 = () => {
  const setKey = useBearContext((state) => state.increaseCount);
  const key = useBearContext((state) => state.count);
  return (
    <div>
      <button type="button" onClick={() => setKey(1)}>
        Set Key
      </button>
      <div>Key: {key}</div>
    </div>
  );
};

*/
