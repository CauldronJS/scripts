const StyleType = {
  LIG: 0,
  COLOR: 1
};

class Style {
  static registered = Object.create(null);

  /**
   *
   * @param {String} code The color code to apply
   * @param {StyleType} type The type of style it is
   */
  constructor(code, type) {
    this.code = code;
    this.type = type;
    Style.registered[code] = this;
  }
}

const codes = {
  reset: new Style('r', StyleType.LIG),
  bold: new Style('l', StyleType.LIG),
  italic: new Style('o', StyleType.LIG),
  underline: new Style('n', StyleType.LIG),
  strikethrough: new Style('m', StyleType.LIG),
  obfuscated: new Style('k', StyleType.LIG),

  black: new Style(0, StyleType.COLOR),
  darkblue: new Style(1, StyleType.COLOR),
  darkgreen: new Style(2, StyleType.COLOR),
  darkaqua: new Style(3, StyleType.COLOR),
  darkred: new Style(4, StyleType.COLOR),
  darkpurple: new Style(5, StyleType.COLOR),
  gold: new Style(6, StyleType.COLOR),
  gray: new Style(7, StyleType.COLOR),
  grey: Style.registered[7],
  darkgray: new Style(8, StyleType.COLOR),
  darkgrey: Style.registered[8],
  blue: new Style(9, StyleType.COLOR),
  green: new Style('a', StyleType.COLOR),
  aqua: new Style('b', StyleType.COLOR),
  red: new Style('c', StyleType.COLOR),
  pink: new Style('d', StyleType.COLOR),
  yellow: new Style('e', StyleType.COLOR),
  white: new Style('f', StyleType.COLOR)
};

function buildStyleString(style = codes.reset, input = '') {
  return `\xA7${style.code}${input}`;
}

function applyStyleFns(target) {
  // never do this in the wild. This functionallity is not
  // guaranteed to work in the future and tbh is a concept
  // left over from like 2011. Just don't. Please.

  // first create an object wrapper for target using String
  // then add the styles as functions to the modifiedTarget

  // eslint-disable-next-line no-new-wrappers
  const modifiedTarget = new String(target || buildStyleString());
  for (const styleName in codes) {
    const style = codes[styleName];

    Object.defineProperty(modifiedTarget, styleName, {
      get() {
        return input => {
          const addToEnd = buildStyleString(style, input);
          return applyStyleFns(modifiedTarget + addToEnd);
        };
      }
    });
  }
  return modifiedTarget;
}

Object.defineProperty(module, 'exports', {
  get() {
    return applyStyleFns();
  }
});
