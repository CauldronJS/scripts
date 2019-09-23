const async_hook_fields = [];
const async_id_fields = [];
const owner_symbol = Symbol('asyncWrapOwner');

const pushAsyncIds = () => {};
const popAsyncIds = () => {};

const enablePromiseHook = () => {};
const disablePromiseHook = () => {};

const registerDestroyHook = () => {};

const constants = {
  kInit,
  kBefore,
  kAfter,
  kDestroy,
  kTotals,
  kPromiseResolve,
  kCheck,
  kExecutionAsyncId,
  kAsyncIdCounter,
  kTriggerAsyncId,
  kDefaultTriggerAsyncId,
  kStackLength
};
