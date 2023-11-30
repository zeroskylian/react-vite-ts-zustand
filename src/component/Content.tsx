import React from 'react'
import Input from 'antd/es/input/Input'
import { shallow } from 'zustand/shallow'
import { getCount, getName, useAppStore } from '@/store'

function Content() {
  const name = useAppStore(getName, shallow)
  const count = useAppStore(getCount, shallow)
  return (
    <div>
      <Input
        size="small"
        value={name}
        onChange={(e) => {
          useAppStore.setState({ name: e.target.value })
        }}
      />
      <Input
        size="small"
        value={count}
        onChange={(e) => {
          useAppStore.setState({ count: Number(e.target.value) })
        }}
      />
      {count}
    </div>
  )
}

export default Content
