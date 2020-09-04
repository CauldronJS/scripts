export const map = (collection, handler) => {
  const result = [];
  for (let i = 0; i < collection.length; ++i) {
    const item = collection[i];
    result.push(handler(item, i));
  }
  return result;
};
