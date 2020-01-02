function Fragment(props) {
  this[FRAG_SYMBOL] = true;
  return props.children;
}

export default Fragment;
export const FRAG_SYMBOL = Symbol('rinseFragment');
