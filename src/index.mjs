import { createSignal } from '../lib/signal.mjs';
import { defineComponent, render, html } from '../lib/ui.mjs';

const DisplaySum = defineComponent(({ a, b }) => {
  return () => {
    return html`<span style="font-weight: 600;">${a + b}</span>`;
  };
});

const App = defineComponent(() => {
  const [a, setA] = createSignal(0);
  const [b, setB] = createSignal(0);

  function plusA() {
    setA(a() + 1);
  }
  function plusB() {
    setB(b() + 1);
  }

  return () => {
    const Sum = DisplaySum({ a: a(), b: b() });

    return html`<div>
      <div>${a()} + ${b()} = ${Sum()}</div>
      <div>
        <button onclick=${() => plusA()}>a++</button>
        <button onclick=${() => plusB()}>b++</button>
      </div>
    </div>`;
  };
});

const root = document.querySelector('#app');
render(root, App);
