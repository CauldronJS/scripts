export default function useState(defaultValue) {
  const state = defaultValue;
  const setState = partialState =>
    Object.defineProperties(
      state,
      Object.getOwnPropertyDescriptors(partialState)
    );
  return [state, setState];
}
