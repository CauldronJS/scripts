/**
 * The in-memory storage service for language translations
 *
 * Concept:
 * Translations are fetched by namespaces, but we don't really have context
 * of what language the fetch is for. Now, we could expose the current user
 * to event handlers without arguments into the handlers, but that's kind of
 * hackish and I'm sure there's easier ways to create session-like objects
 * for these determinations. For now, we'll require a player object to be
 * passed in for a translate, else use local language.
 *
 * - directory structure determines namespace
 * - the language service server processes the translations asynchronously,
 *   creating a ref to a transformation function for each entry (much like an
 *   AST walker)
 *
 * Usage:
 *
 * // usage in JS
 * const {lts} = require('@cauldronjs/lts');
 *
 * // for player specific
 * player.sendMessage(lts(player, 'cauldron.greetings.helloPlayer'));
 *
 * // for console specific
 * console.writeLine(lts('cauldron.greetings.helloConsole'));
 */

const storedText = Object.create(null);

export const lookupText = (id, language, params) => null;

export const getLang = (target) => null;
