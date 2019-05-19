import cauldron, { Command } from '@cauldron/core';
import pretty from '@cauldron/pretty';
import Rinse from '@cauldron/rinse';
import captcha from '@cauldron/captcha';

cauldron();
cauldron.events.server.on('listping', ({ setMotd }) => setMotd('Testing'));

const executeJs = ({ args }) => {
  const patched = args.join(' ');
  console.log(patched);
  const result = __cauldron__.evalScript(patched, 'repl');
  return `\xA77=> ${pretty(result)}`;
};

const JsCommand = () => (
  <Command
    name="js"
    permission="cauldron.js"
    execute={executeJs}
    description="Executes a JS snippet"
    usage="/<command> [snippet]"
  />
);

const app = Rinse.mount(<JsCommand />);
