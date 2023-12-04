import React from 'react'
import Input from 'antd/es/input/Input'
import { appStore } from '@/store'

function Content() {
  const name = appStore.getState().name
  const count = appStore.getState().count
  return (
    <div>
      <Input
        size="small"
        value={name}
        onChange={(e) => {
          appStore.setState({ name: e.target.value })
        }}
      />
      <Input
        size="small"
        value={count}
        onChange={(e) => {
          appStore.setState({ count: Number(e.target.value) })
        }}
      />
      {count}
    </div>
  )
}

export default Content
