const StyleType = {
  LIG: 0,
  COLOR: 1,
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
  white: new Style('f', StyleType.COLOR),
};

function applyStyleFns(target = '') {
  // eslint-disable-next-line no-new-wrappers
  const styled = new String(target);
  for (const styleName in codes) {
    const style = (codes[styleName] || { code: null }).code;
    styled[styleName] = (input) =>
      applyStyleFns(`${target}${style ? `\xA7${style}` : ''}${input}\xA7r`);
  }
  return styled;
}

Object.defineProperty(module, 'exports', {
  get() {
    return applyStyleFns();
  },
});
