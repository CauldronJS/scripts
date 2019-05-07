// keeps track of the current dispatched component

let current = null;

export const getCurrent = () => current;

export const setCurrent = dispatcher => (current = dispatcher);
