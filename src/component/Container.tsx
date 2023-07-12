import React from 'react';
import { useStore, useStoreApi } from '../store/context';
import { Input } from 'antd';

export default function Container() {
  const store = useStore();
  const api = useStoreApi();
  console.log('Container render');

  return (
    <>
      <Input
        type="text"
        value={store.name}
        onChange={(e) => {
          api.setState({ name: e.currentTarget.value });
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
          api.setState((state) => {
            return {
              count: state.count + 2
            };
          });
        }}
      >
        count is {store.count}
      </button>
    </>
  );
}
