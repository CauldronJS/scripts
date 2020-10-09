declare module '@cauldron/colors' {
  export default class ColorProvider {
    static reset(value: string): string;
    static bold(value: string): string;
    static italic(value: string): string;
    static underline(value: string): string;
    static strikethrough(value: string): string;
    static obfuscated(value: string): string;
    static black(value: string): string;
    static darkblue(value: string): string;
    static darkgreen(value: string): string;
    static darkaqua(value: string): string;
    static darkred(value: string): string;
    static darkpurple(value: string): string;
    static gold(value: string): string;
    static gray(value: string): string;
    static grey(value: string): string;
    static darkgray(value: string): string;
    static darkgrey(value: string): string;
    static blue(value: string): string;
    static green(value: string): string;
    static aqua(value: string): string;
    static red(value: string): string;
    static pink(value: string): string;
    static yellow(value: string): string;
    static white(value: string): string;
  }
}
