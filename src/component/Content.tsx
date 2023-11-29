import React from 'react';
import Input from 'antd/es/input/Input';
import { useAppStore, getName, getCount } from '@/store';
import { shallow } from 'zustand/shallow';

function Content() {
  const name = useAppStore(getName, shallow);
  const count = useAppStore(getCount, shallow);
  return (
    <div>
      <Input
        size="small"
        value={name}
        onChange={(e) => {
          useAppStore.setState({ name: e.target.value });
        }}
      />
      <Input
        size="small"
        value={count}
        onChange={(e) => {
          useAppStore.setState({ count: Number(e.target.value) });
        }}
      />
      {count}
    </div>
  );
}

export default Content;
