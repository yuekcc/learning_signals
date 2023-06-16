import { shallowRef, watchEffect } from '../lib/index.mjs';
import h from 'hyperscript';
import htm from 'htm';

const html = htm.bind(h);

function render(el, buildHtml) {
  const fx = () => {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }

    const dom = buildHtml.call(buildHtml);
    el.append(dom);
  };
  watchEffect(fx);
}

function DisplaySum(a, b) {
  return () => html`<span style="font-weight: 600;">${a + b}</span>`;
}

function App() {
  const a = shallowRef(0);
  const b = shallowRef(0);

  function plusA() {
    a.value += 1;
  }
  function plusB() {
    b.value += 1;
  }

  return () => {
    const Sum = DisplaySum(a.value, b.value);

    return html`<div>
      <div>${a.value} + ${b.value} = ${Sum()}</div>
      <div>
        <button onclick=${() => plusA()}>a++</button>
        <button onclick=${() => plusB()}>b++</button>
      </div>
    </div>`;
  };
}

const root = document.querySelector('#app');
render(root, App());
