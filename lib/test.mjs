import test from 'node:test';

import { createSignal, effect, createMemo } from './signal.mjs';

test('signal', () => {
  return new Promise(resolve => {
    const [a, setA] = createSignal(0);
    const [b, setB] = createSignal(0);

    effect(() => {
      const sum = a() + b();
      console.log('sum = %d + %d = %d', a(), b(), sum);
    });

    setA(1);
    setB(2);

    resolve();
  });
});

test('memo', () => {
  const [a, setA] = createSignal(1);
  const [b] = createMemo(() => a() + 1);

  effect(() => {
    console.log(`a = ${a()}, b = ${b()}`);
  });

  setA(2);
});
