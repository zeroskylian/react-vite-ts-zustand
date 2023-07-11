import React from 'react';
import { useStore } from '../store';
import Input from 'antd/es/input/Input';

export default function Container() {
  const store = useStore();
  return (
    <>
      <Input
        type="text"
        value={store.name}
        onChange={(e) => {
          useStore.setState({ name: e.currentTarget.value });
        }}
      />
      <button
        onClick={() => {
          store.asyncIncreaseCount(2);
        }}
      >
        count is {store.count}
      </button>
    </>
  );
}
