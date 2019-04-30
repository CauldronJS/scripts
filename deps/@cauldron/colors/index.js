const colors = Object.create(null);

function bindFactory(name, factory) {
  for (const field in colors) {
    Object.defineProperty(factory, field, {
      get() {
        return colors[field];
      }
    });
  }
}

function _addColor(name, factory) {
  colors[name] = factory;
}

/**
 * Adds a custom color factory to be used.
 *
 * @export
 * @param {String} name
 * @param {(char:String,i:Number) => String} factory
 */
export function addColor(name, factory) {
  const boundFactory = bindFactory(name, factory);
  _addColor(name, boundFactory);
}

/**
 * Creates a factory that only applies the decorator to
 * the beginning of the string.
 * 
 * @param {String} decorator 
 */
export const prependFactory = decorator => (char, i) =>
  i === 0 ? `${decorator}${char}` : char;

export default colors;