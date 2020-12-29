/* eslint-disable camelcase */

const constants = {
  // used as hook identifiers
  kInit: 0,
  kBefore: 1,
  kAfter: 2,
  kDestroy: 3,
  kTotals: 4,
  kPromiseResolve: 5,
  kCheck: 6,
  // used as state identifiers
  kExecutionAsyncId: 7,
  kAsyncIdCounter: 8,
  kTriggerAsyncId: 9,
  kDefaultTriggerAsyncId: 10,
  kStackLength: 11,
  kUidFieldsCount: 12
};

// Each index tracks the number of hooks for the field types
const async_hook_fields = {
  [constants.kInit]: 0,
  [constants.kBefore]: 0,
  [constants.kAfter]: 0,
  [constants.kDestroy]: 0,
  [constants.kTotals]: 0,
  [constants.kPromiseResolve]: 0,
  [constants.kCheck]: 0
};
// Each index contains the IDs for the various states
const async_id_fields = {
  [constants.kExecutionAsyncId]: {},
  [constants.kTriggerAsyncId]: {},
  [constants.kAsyncIdCounter]: {},
  [constants.kDefaultTriggerAsyncId]: {}
};
const owner_symbol = Symbol('asyncWrapOwner');

const pushAsyncIds = (asyncId, triggerAsyncId) => {
  // push the async ID to the running tasks collection
};
const popAsyncIds = asyncId => {
  // get the trigger async ID that matches the async ID pair
};
const clearAsyncIdStack = () => {
  // clears the async IDs that are queued
};

const enablePromiseHook = () => {
  // enables the promise for fullfilment on the next stack empty
};
const disablePromiseHook = () => {
  // disables the promise and prevents it from running on the next stack empty
};

const registerDestroyHook = () => {};

const setupHooks = ({ init, before, after, destroy, promise_resolve }) => {
  if (init) {
    async_hook_fields[constants.kInit]++;
  }
  if (before) {
    async_hook_fields[constants.kBefore]++;
  }
  if (after) {
    async_hook_fields[constants.kAfter]++;
  }
  if (destroy) {
    async_hook_fields[constants.kDestroy]++;
  }
  if (promise_resolve) {
    async_hook_fields[constants.kPromiseResolve]++;
  }
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
