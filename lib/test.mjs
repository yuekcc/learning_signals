import test from 'node:test';

import { shallowRef, watchEffect } from './index.mjs';

test('shallowRef', () =>
  new Promise(resolve => {
    const a = shallowRef(0);
    const b = shallowRef(0);

    watchEffect(() => {
      const sum = a.value + b.value;
      console.log('sum = %d + %d = %d', a.value, b.value, sum);
    });

    a.value = 1;
    b.value = 2;

    resolve();
  }));
