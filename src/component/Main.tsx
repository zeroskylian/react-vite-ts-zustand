import React, { useState, useRef, createRef } from 'react';

function Main() {
  return (
    <div className="relative">
      <div className="h-20 bg-slate-600 flex">
        <div className="w-20 h-15 bg-red-50 ml-2 "></div>
        <div className="w-20 h-15 bg-red-50 ml-2"></div>
      </div>
    </div>
  );
}

export default Main;

export const RefDifference: React.FC = () => {
  const [renderIndex, setRenderIndex] = useState(1);
  const refFromUseRef = useRef<number>();
  const refFromCreateRef = createRef();
  console.info(refFromUseRef.current, 'refFromUseRef.current');
  console.info(refFromCreateRef.current, 'refFromCreateRef.current');
  if (!refFromUseRef.current) {
    refFromUseRef.current = renderIndex;
  }

  if (!refFromCreateRef.current) {
    refFromCreateRef.current = renderIndex;
  }
  return (
    <>
      <p>Current render index: {renderIndex}</p>
      <p>
        <b>refFromUseRef</b> value: {refFromUseRef.current}
      </p>
      <p>
        <b>refFromCreateRef</b> value:
        {refFromCreateRef.current}
      </p>
      <button onClick={() => setRenderIndex((prev) => prev + 1)}>
        Cause re-render
      </button>
    </>
  );
};
