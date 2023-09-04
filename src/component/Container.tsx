import React, { FC, useState, useEffect } from 'react';
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
      <Demo />
    </>
  );
}

export const Demo: FC = () => {
  const [state, setState] = useState(0);
  console.log(state);
  useEffect(() => {
    setTimeout(
      () =>
        setState((old) => {
          return old + 1;
        }),
      3000
    );
  }, []);
  return (
    <div>
      <button onClick={() => setState(state + 1)}>{state}</button>
    </div>
  );
};
