const async_hook_fields = [];
const async_id_fields = [];
const owner_symbol = Symbol('asyncWrapOwner');

const pushAsyncIds = (asyncId, triggerAsyncId) => {};
const popAsyncIds = asyncId => {};
const clearAsyncIdStack = () => {};

const enablePromiseHook = () => {};
const disablePromiseHook = () => {};

const registerDestroyHook = () => {};

const setupHooks = ({ init, before, after, destroy, promise_resolve }) => {};

const constants = {
  kInit: 0,
  kBefore: 1,
  kAfter: 2,
  kDestroy: 3,
  kTotals: 4,
  kPromiseResolve: 5,
  kCheck: 6,
  kExecutionAsyncId: 7,
  kAsyncIdCounter: 8,
  kTriggerAsyncId: 9,
  kDefaultTriggerAsyncId: 10,
  kStackLength: 11,
  kUidFieldsCount: 12
};

module.exports = {
  async_hook_fields,
  async_id_fields,
  owner_symbol,
  pushAsyncIds,
  popAsyncIds,
  clearAsyncIdStack,
  enablePromiseHook,
  disablePromiseHook,
  registerDestroyHook,
  setupHooks,
  constants
};
