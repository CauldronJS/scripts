/**
 * TTY library for Cauldron
 *
 * @file    \lib\tty.js
 * @author  Justin Cox <https://conji.me>
 */

exports.ReadStream = new (class {})();

exports.WriteStream = new (class {})();

exports.isatty = () => {
  // this is set to true because Cauldron will always be run in a text
  // terminal instance through Spigot
  return true;
};
