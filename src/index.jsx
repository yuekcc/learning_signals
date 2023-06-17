import { createMemo, createSignal } from '../lib/signal.mjs';
import { defineComponent, render } from '../lib/ui.mjs';

const makeDisplayNumber = defineComponent(({ fontWeight }) => {
  return children => {
    return <span style={{ 'font-weight': fontWeight, 'font-size': '200px' }}>{children}</span>;
  };
});

const makeApp = defineComponent(() => {
  const [time, setTime] = createSignal(Date.now());
  const [displayTime] = createMemo(() => {
    return (time() / 1000).toFixed(3);
  });

  let timer;

  function stop() {
    clearInterval(timer);
    timer = -1;
  }

  function start() {
    timer = setInterval(() => {
      setTime(Date.now());
    }, 100);
  }

  start();

  return () => {
    const DisplayNumber = makeDisplayNumber({ fontWeight: '600' }); // 子组件

    return (
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center">
        <div>
          <div>{DisplayNumber(<span>{displayTime()}s</span>)}</div>
        </div>

        <div style="display: flex; justify-content: center; gap: 10px">
          <button style="width: 5rem" onclick={() => stop()}>
            暂停
          </button>
          <button style="width: 5rem" onclick={() => start()}>
            开始
          </button>
        </div>
      </div>
    );
  };
});

render('#app', makeApp);
