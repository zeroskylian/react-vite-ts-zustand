import React, { useContext } from 'react'
import { useStore } from 'zustand'
import { shallow } from 'zustand/shallow'
import { BearContext } from '@/store/context/react_context'
import { getName } from '@/store'

export default function Header() {
  const store = useContext(BearContext)
  if (!store)
    throw new Error('Missing BearContext.Provider in the tree')
  const name = useStore(store, getName, shallow)
  console.log('Header render')
  return (
    <div>
      {' '}
      Context Top
      {' '}
      <br />
      {' '}
      {name}
    </div>
  )
}
