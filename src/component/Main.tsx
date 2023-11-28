import React from 'react';
import { useAppStore, getName } from '@/store';
import { shallow } from 'zustand/shallow';

function Main() {
  const name = useAppStore(getName, shallow);
  return (
    <div className="relative">
      <div className="h-20 bg-slate-600 flex">
        <div className="w-20 h-15 bg-red-50 ml-2 "></div>
        <div className="font-medium">{name}</div>
        <div className="w-20 h-15 bg-red-50 ml-2"></div>
      </div>
    </div>
  );
}

export default Main;
