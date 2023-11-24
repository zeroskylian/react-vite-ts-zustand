# 1. 引入

完整代码见：[demo](https://github.com/zeroskylian/react-vite-ts-zustand)

```
npm i zustand
```

# 2. 创建 store

```TypeScript
interface BearState {
  name: string;
  count: number;
}

export const useStore = create<BearState>()(
  (set, get) => {
    return {
      name: 'antd',
      count: 0
    };
  }
);
```

# 3. 使用

```jsx
import useStore from '@/store/store.ts';

export default function Container() {
  const store = useStore();
  return (
	  <Input
        type="text"
        value={store.name}
        onChange={(e) => {
          useStore.setState({ name: e.currentTarget.value });
        }}
      />
      <button onClick={() =>
	      useStore.setState((state) => {
            return { count: state.count + 1 };
          })
      }>
        count is {store.count}
      </button>
  );
}
```

## 3.1 Action

上面的按钮点击可以抽出一个方法，`increaseCount` 这样每次使用，就没必要写一堆重复代码

```TypeScript
interface BearState {
  increaseCount: (by: number) => void;
}

export const useStore = create<BearState>()(
  (set, get) => {
    return {
      increaseCount: (count: number) => {
        set((state) => {
          return {
            count: state.count + count
          };
        });
      }
    };
  }
);
```

```TypeScript
<button onClick={() => store.increaseCount(2)}>
    count is {store.count}
</button>
```

## 3.2 异步 action

zustand 创建异步 action 没必要像 redux 一样使用 extraReducers, 直接标记 async 就行

```TypeScript
interface BearState {
  asyncIncreaseCount: (by: number) => void;
}

export const useStore = create<BearState>()(
  (set, get) => {
    return {
      asyncIncreaseCount: async (count: number) => {
        setTimeout(() => {
          set((state) => {
            return {
              count: state.count + count
            };
          });
        }, 2000);
      }
    };
  },
);
```

## 3.3 Action 交互

比如增加已和方法，获取 count 最近的 5 的倍数，这时就需要在 action 中获取当前 count，甚至可以在一个 action 中，调用其他 action

```TypeScript
interface BearState {
	getNearFive: () => void;
}

export const useStore = create<BearState>()(
  (set, get) => {
    return {
      getNearFive: () => {
        const count = get().count;
        const value =
          count % 5 < 3 ? count - (count % 5) : count + 5 - (count % 5);
        set({ count: value });
      }
    };
  },
);
```

# 4. 结构组织与类型定义

```
./store
├── createStore.ts        // Action 与 store
├── selectors.ts          // 状态派生
├── initialState.ts       // State 类型定义与 初始状态
└── index.ts
```

- initialState 负责 State —— 添加状态类型与初始化状态值；
- selectors 负责 Selector ——派生类选择器逻辑；
- createStore 负责书写创建 Store 的方法与 Action 方法；
  以我们上面项目的为例：

## initialState

```TypeScript
// initialState

export interface State {
  name: string;
  count: number;
}

export const initialState: State = {
  name: 'lian',
  count: 0
};
```

首先来看看 initialState ，这个文件中主要用于定于并导出后续在 Store 所有需要的状态。
导出的部分包含两个： State 类型定义与 初始状态 initialState。将 State 和 initialState 定义在一个文件中会有一个好处：类型跳转会直接指向到这里，方便添加类型与类型的初始值。 由于 state 单独新建了一个文件，因此哪怕后续状态再多，也能在这一个文件中看得清清楚楚。

## createStore

```TypeScript
import type { State } from './initialState';
import { initialState } from './initialState';
import { create } from 'zustand';

interface Action {
  increaseCount: (by: number) => void;
  asyncIncreaseCount: (by: number) => void;
  getNearFive: () => void;
}

export type Store = State & Action;

export const useStore = create<Store>((set, get) => ({
  ...initialState,
  increaseCount: (count: number) => {
    set((state) => {
      return {
        count: state.count + count
      };
    });
  },
  asyncIncreaseCount: async (count: number) => {
    setTimeout(() => {
      set((state) => {
        return {
          count: state.count + count
        };
      });
    }, 2000);
  },
  getNearFive: () => {
    const count = get().count;
    const value = count % 5 < 3 ? count - (count % 5) : count + 5 - (count % 5);
    set({ count: value });
  }
}));
```

1. 定义了 store 中 Action 的类型，然后将 State 和 Action 合并为 Store 类型，并导出了 Store 的类型（比较重要）；
2. 给 create 方法添加了 Store 的类型，让 store 内部识别到自己这个 store 包含了哪些方法；
3. 将 initialState 解构导入 store（原来定义 state 的部分已经抽出去到 initialState 里了）；

## selectors

```ts
import type { Store } from './createStore';

export const isOdd = (s: Store) => {
  return s.count % 2 == 0;
};

export const getName = (state: Store) => {
  return state.name;
};
```

这个文件很简单，只需要导入 Store 的类型，然后逐一导出相应的 selector 即可。

## index. ts

最后在 index. ts 中输出相应的方法和类型即可：

```ts
export { useStore } from './createStore';
export type { Store } from './createStore';
export type { State } from './initialState';
export * from './selectors';
```

# 5. 与 Context 联动

之前我们使用的 useStore 是全局单例，也就是应用全局使用，如果你想要把应用封装为组件，这时就可以使用 Context 来隔离多个实例[[思想#Context]]

## v4 不推荐了

完整代码见 [demo](https://github.com/zeroskylian/react-vite-ts-zustand/tree/context)

1. 定义 store 类型
   与上方例子一致
2. createStore

```TypeScript
import { createStore } from 'zustand';
import type { StoreApi } from 'zustand';
import createContext from 'zustand/context';
import type { State } from './initialState';
import { initialState } from './initialState';
import { Action } from './createStore';

export const sharedStore = () =>
  createStore<Store>((set, get) => ({
    ...initialState,
    increaseCount: (count: number) => {
      set((state) => {
        return {
          count: state.count + count
        };
      });
    },
    asyncIncreaseCount: async (count: number) => {
      setTimeout(() => {
        set((state) => {
          return {
            count: state.count + count
          };
        });
      }, 2000);
    },
    getNearFive: () => {
      const count = get().count;
      const value =
        count % 5 < 3 ? count - (count % 5) : count + 5 - (count % 5);
      set({ count: value });
    }
  }));
```

3. 创建 context 并导出

```TypeScript
export const { Provider, useStore, useStoreApi } =
  createContext<StoreApi<Store>>();
```

- Provider： 是组件
- useStore： 用于获取数据
- useStoreApi ：与直接使用不同的是 Provider 的 useStore 中不包含 setState 方法，需要使用 useStoreApi 用于调用 setState 方法，如果是 state 中的 action 还是可以用 `store.updateCount` 调用的

4. 使用 Provider

```tsx
function App() {
  return (
    <div>
      <Provider createStore={sharedStore}>
        <div className="card">
          <Header />
          <Container />
          <Footer />
        </div>
      </Provider>
      <Other />
    </div>
  );
}

const Other: React.FC = () => {
  try {
    const store = useStore();
    return <div>{store.ancestor ?? ''}</div>;
  } catch (error) {
    // 会报错
    return <div>error</div>;
  }
};
```

5. 使用 store

```tsx
import React from 'react';
import { useStore, useStoreApi } from '../store/context';
import { Input } from 'antd';

export default function Container() {
  const store = useStore();
  const api = useStoreApi();
  console.log('Container render');

  return (
    <>
      <Input
        type="text"
        value={store.name}
        onChange={(e) => {
          api.setState({ name: e.currentTarget.value });
        }}
      />
      <button
        onClick={() => {
          store.increaseCount(2);
        }}
      >
        count is {store.count}
      </button>

      <button
        onClick={() => {
          api.setState((state) => {
            return {
              count: state.count + 2
            };
          });
        }}
      >
        count is {store.count}
      </button>
    </>
  );
}
```

## future

使用 react 的 Context:
createStore 代码一致, 不同的是创建 Context 过程,使用 React 的 Context

```ts
export const BearContext = createContext<BearStore | null>(null);
```

使用时:

```tsx
import { BearContext, createBearStore } from './store/context/react_context';

function App() {
  const store = useRef(createBearStore()).current;
  return (
    <div>
      <BearContext.Provider value={store}>{components}</BearContext.Provider>
      <Other />
    </div>
  );
}
```

子组件使用, 有两种方式: 1: 直接使用 useStore, 2 使用封装好的组件

```tsx
/// 举例 方式1
export const Consumer = () => {
  const storeApi = useContext(BearContext);
  if (!storeApi) throw new Error('Missing TestContext.Provider in the tree');
  const setKey = useStore(storeApi, (state) => state.increaseCount);
  const key = useStore(storeApi, (state) => state.count);
  return (
    <div>
      <button type="button" onClick={() => setKey(1)}>
        Set Key
      </button>
      <div>Key: {key}</div>
    </div>
  );
};

/// 举例 方式2
export const Consumer1 = () => {
  const setKey = useBearContext((state) => state.increaseCount);
  const key = useBearContext((state) => state.count);
  return (
    <div>
      <button type="button" onClick={() => setKey(1)}>
        Set Key
      </button>
      <div>Key: {key}</div>
    </div>
  );
};
```

# 6. Immer

wait

# 注意点

1. zustand 默认做了变量的优化，只要是从 useStore 解构获得的函数，默认是引用不变的，也就是使用 zustand store 的函数本身并不会造成不必要的重复渲染。
2. 如果一个组件引入了整个 store, 那么 store 发生风吹草动,都会引起组件的刷新, 但是只要引入了关注的部分, 其他的状态的改变不会引起组件的刷新, 这时就是使用 selector, 优化组件

```tsx
import { shallow } from 'zustand/shallow';
const getName = (state: BearState) => {
  return state.name;
};

export default function Header() {
  const store = useContext(BearContext);
  if (!store) throw new Error('Missing BearContext.Provider in the tree');
  const name = useStore(store, getName, shallow);
  console.log('Header render');
  return <div>{name}</div>;
}
```
