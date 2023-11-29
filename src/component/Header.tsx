import React from 'react';
import { useAppStore, getName } from '@/store';
import { shallow } from 'zustand/shallow';

function Header() {
  const name = useAppStore(getName, shallow);
  return (
    <div className="relative">
      <div className="h-20 bg-slate-600 flex justify-start items-center">
        <div className="w-20 h-12 bg-red-50 ml-2 "></div>
        <div className="ml-2 font-medium text-sky-100">{name}</div>
        <div className="w-20 h-12 bg-red-50 ml-auto"></div>
      </div>
    </div>
  );
}

export default Header;
