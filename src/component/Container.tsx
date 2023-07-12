import React, { useContext } from 'react';
import { Input } from 'antd';
import { useStore } from 'zustand';
import { BearContext } from '@/store/context/react_context';

export default function Container() {
  const context = useContext(BearContext);
  if (!context) throw new Error('Missing BearContext.Provider in the tree');
  const store = useStore(context);
  console.log('Container render');
  return (
    <>
      <Input
        type="text"
        value={store.name}
        onChange={(e) => {
          context.setState({ name: e.currentTarget.value });
        }}
      />
      <button
        onClick={() => {
          store.increaseCount(2);
        }}
      >
        count is {store.count}
      </button>

      <button
        onClick={() => {
          context.setState((state) => {
            return {
              count: state.count + 1
            };
          });
        }}
      >
        count is {store.count}
      </button>
    </>
  );
}
