/**
 * Creates an iterator for Cauldron that can asynchronously read a buffer/stream
 *
 * @file    \lib\internal\streams\async_interator.js
 * @author  Justin Cox <https://conji.me>
 */

// god I hope async code works here
const AsyncIteratorPrototype = Object.getPrototypeOf(
  Object.getPrototypeOf(async function*() {}).prototype
);
