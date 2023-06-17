# Signals

signal 是一种响应式引用实现。通过 signal 包装一个值可以追踪该值的变化而自动触发回调。

当前包括：一个 signal 实现、一个 memo 实现、一个简单的响应式 UI 库。

🚧🚧🚧 这是一个简陋的 signal 实现，just for fun 🚧🚧🚧

优秀的响应式实现，可以看看这些（只列出一小部分）：

- [@vue/reactivity](https://npm.io/package/@vue/reactivity)
- [@preact/signals](https://npm.io/package/@preact/signals)

## 响应式引用

```js
import { createSignal, effect } from './lib/signal.mjs';

const [val, setVal] = createSignal(0); // 创建一个引用

// 设置变更时的回调
effect(() => {
  console.log(val());
});

// 更新值
setVal(1);
```

## UI 库

声明组件：

```jsx
// 声明一个 Component builder
const AComponent = props => {
  const [val] = createSignal(0); // 通过闭包将响应式对象保存到组件中

  // 组件实现上是一个返回 DOM 的函数
  return children => {

    // 支持 jsx 语法，渲染使用了 hyperscript（jsx 特性和 react 有部分区别）
    return (
      <div>
        <h1>{val()}</h1>
        {children}
      </div>
    );
  };
};
```

更新示例参考：[src/index.jsx](src/index.jsx)

## 运行示例

```sh
pnpm i
pnpm dev
```

# LICENSE

[MIT](LICENSE)
