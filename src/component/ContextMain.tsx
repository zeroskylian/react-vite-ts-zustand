import React from 'react';
import { useBearContext } from '@/store/context/react_context_component';
import { getName } from '@/store';

function ContextMain() {
  const store = useBearContext(getName);
  return <div>ContextMain_{store}</div>;
}

export default ContextMain;
