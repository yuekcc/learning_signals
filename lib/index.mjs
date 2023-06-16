let _TARGET = null;
const _DEPS = new WeakMap();

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

class Ref {
  constructor(init) {
    this._value = init;
  }
  set value(val) {
    this._value = val;
    const dep = _DEPS.get(this);
    if (dep) {
      dep.notify();
    }
  }
  get value() {
    let dep = _DEPS.get(this);
    if (!dep) {
      dep = new Dep();
      _DEPS.set(this, dep);
    }

    dep.depend();
    return this._value;
  }
}

export function shallowRef(init) {
  return new Ref(init);
}

export function watchEffect(effect) {
  _TARGET = effect;
  effect();
  _TARGET = null;
}
