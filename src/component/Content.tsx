import React from 'react'
import Input from 'antd/es/input/Input'
import { useStore } from '@/store'

function Content() {
  const name = useStore.getState().name
  const count = useStore.getState().count
  return (
    <div>
      <Input
        size="small"
        value={name}
        onChange={(e) => {
          useStore.setState({ name: e.target.value })
        }}
      />
      <Input
        size="small"
        value={count}
        onChange={(e) => {
          useStore.setState({ count: Number(e.target.value) })
        }}
      />
      {count}
    </div>
  )
}

export default Content
