let _TARGET = null;
const _DEPS = new WeakMap();
function initDep(ref) {
  let dep = _DEPS.get(ref);
  if (!dep) {
    dep = new Dep();
    _DEPS.set(ref, dep);
  }

  return dep;
}

class Dep {
  constructor() {
    this._listeners = [];
  }

  depend() {
    if (_TARGET && !this._listeners.includes(_TARGET)) {
      this._listeners.push(_TARGET);
    }
  }

  notify() {
    this._listeners.forEach(fn => fn());
  }
}

/**
 * 创建 signal 包装（只是 shallow 包装）
 * @param {any} init
 * @returns {[getter: () => any; setter: (newVal: any) => void]}
 */
export function createSignal(init) {
  const ref = {
    value: init,
  };

  const getter = () => {
    const dep = initDep(ref);
    dep.depend();
    return ref.value;
  };

  const setter = newVal => {
    ref.value = newVal;
    const dep = initDep(ref);
    dep.notify();
  };

  return [getter, setter];
}

/**
 * 注册副作用处理函数
 * @param {() => void} fx
 */
export function effect(fx) {
  _TARGET = fx;
  fx();
  _TARGET = null;
}

/**
 * 创建一个只读的 signal，并可以依赖其他 signal
 * @param {() => any} producer
 * @returns
 */
export function createMemo(producer) {
  const [val, setVal] = createSignal();
  effect(() => {
    setVal(producer());
  });

  return [val];
}
