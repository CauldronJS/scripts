export const omitUndefined = target =>
  Object.keys(target).reduce(
    (result, key) => (target[key] ? { ...result, [key]: target[key] } : result),
    {}
  );
