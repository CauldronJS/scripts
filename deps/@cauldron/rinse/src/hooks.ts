// a very arbitrary implementation of hooks
import { getCurrentVtreeInstance } from './vtree';
import { SetStateCaller, EffectCallback } from './types';

export default (function() {
  let hooks = [],
    currentHook = 0;

  return {
    useState<T = any>(initialValue: T) {
      hooks[currentHook] = hooks[currentHook] || initialValue;
      const setStateHookIndex = currentHook;
      const setState: SetStateCaller<T> = (newState: T) =>
        (hooks[setStateHookIndex] = newState);
      return [
        hooks[currentHook++] as T,
        getCurrentVtreeInstance().createStateChangeFn(setState)
      ];
    },

    useEffect(callback: EffectCallback, depArray: []) {
      const hasNoDeps = !depArray || depArray.length === 0;
      const deps = hooks[currentHook];
      const hasChangedDeps = deps
        ? !depArray.every((el, i) => el === deps[i])
        : true;
      if (hasNoDeps || hasChangedDeps) {
        getCurrentVtreeInstance().queueEffect(callback);
        hooks[currentHook] = depArray;
      }
      currentHook++;
    }
  };
})();

export const useState = exports.default.useState;
export const useEffect = exports.default.useEffect;
