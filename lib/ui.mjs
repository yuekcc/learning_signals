import hyperscript from 'hyperscript';
import morphdom from 'morphdom';
import uniqueId from 'lodash.uniqueid';

import { effect } from './signal.mjs';

/**
 * 定义一个组件
 * @param {(props?: object) => (children?: Element) => Element} define
 * @returns
 */
export function defineComponent(define) {
  define.__viewId = uniqueId();
  return define;
}

/**
 *
 * @param {Element|string} el
 * @param {(props?: object) => (children?: Element) => Element} component
 */
export function render(el, component) {
  let root = el;
  if (typeof root === 'string') {
    root = document.querySelector(root);
  }

  const buildDom = component();
  let mounted = false;
  let childTree = null;

  const fx = () => {
    if (!mounted) {
      childTree = buildDom();
      root.append(childTree);
      mounted = true;
      return;
    }

    const updatedTree = buildDom();
    morphdom(childTree, updatedTree);
  };
  effect(fx);
}

export const h = hyperscript;
