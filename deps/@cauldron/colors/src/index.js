const colors = Object.create(null);

/**
 * Adds a custom color to the library
 *
 * @export
 * @param {String} name
 * @param {(char:String, i:Number) => String} fn A function executed over every character in the string, return what to insert at said index.
 * @returns
 */
export function addColor(name, fn) {
  const factory = str =>
    !str
      ? factory.prefix
      : [...str].reduce((acc, val, i) => acc + fn(val, i), '');
  factory.prefix = fn('', 0);
  Object.defineProperties(factory, Object.getOwnPropertyDescriptors(colors));
  return colors[name];
}

export const c = (name, pre) =>
  addColor(name, (char, i) => (i === 0 ? `\xA7${pre}${char}` : char));

export const black = c('black', '0');
export const darkblue = c('darkblue', '1');
export const darkgreen = c('darkgreen', '2');
export const darkaqua = c('darkaqua', '3');
export const darkred = c('darkred', '4');
export const darkpurple = c('darkpurple', '5');
export const gold = c('gold', '6');
export const gray = c('gray', '7');
export const grey = gray;
export const darkgray = c('darkgray', '8');
export const darkgrey = darkgray;
export const blue = c('blue', '9');
export const green = c('green', 'a');
export const aqua = c('aqua', 'b');
export const red = c('red', 'c');
export const lightpurple = c('lightpurple', 'd');
export const yellow = c('yellow', 'e');
export const white = c('white', 'f');

export const obfuscated = c('obfuscated', 'k');
export const bold = c('bold', 'l');
export const strikethrough = c('strikethrough', 'm');
export const underline = c('underline', 'n');
export const italic = c('italic', 'o');
export const reset = c('reset', 'r');

export default colors;
