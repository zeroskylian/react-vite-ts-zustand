import React from 'react';
import { useBearContext } from '@/store/context/react_context_component';
import { getFooter } from '@/store';

export default function Footer() {
  console.log('Footer render');
  const footer = useBearContext(getFooter);
  return <div>{footer}</div>;
}
