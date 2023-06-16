import h from 'hyperscript';
import htm from 'htm';

import { effect } from './signal.mjs';

/**
 * 定义一个组件
 * @param {(props?: object) => () => Element} define
 * @returns
 */
export function defineComponent(define) {
  return define;
}

/**
 *
 * @param {Element} el
 * @param {(props?: object) => () => Element} component
 */
export function render(el, component) {
  const buildDom = component();

  const fx = () => {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }

    el.append(buildDom());
  };
  effect(fx);
}

export const html = htm.bind(h);
