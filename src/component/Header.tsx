import React from 'react';
import { useStore, getName } from '@store';
import { shallow } from 'zustand/shallow';

export default function Header() {
  const name = useStore(getName, shallow);
  return <div>{name}</div>;
}
