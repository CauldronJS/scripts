/* eslint-disable */
import { createCommand, unregisterCommand } from './commands';
import Alias from './alias';
import { getPlugin } from './utils';
import { useStore } from './store';
import * as events from './events';

const alias = Alias._create;

function initialize() {
  if (!global.__cauldron__) return;
  createCommand('js', {
    description: 'Executes a JS snippet',
    usage: '/<command> [snippet]',
    permission: 'cauldron.js',
    execute({ args, useState }) {
      const [state, setState] = useState;
      const patched = args.join('\n');
      let result = __cauldron__.evalScript(patched, 'repl.js');
      return `\xA77=> \xA72${result}`;
    }
  });

  createCommand('cauldron', {
    description: 'Info about Cauldron',
    usage: '/<command> [info|reload|',
    permission: 'cauldron.info',
    execute({ sender, args }) {
      switch(args[0]) {
        case 'reload':
          return true;
        case 'info':
          return true;
      }
      return true;
    }
  });
}

export default {
  createCommand,
  unregisterCommand,
  getPlugin,
  alias,
  initialize,
  events,
  useStore
}