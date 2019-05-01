import cauldron from 'cauldron';
import Rinse from '@cauldron/rinse';

const { Command } = cauldron;

cauldron.initialize();
cauldron.events.server.on('listping', ({ setMotd }) => setMotd('Testing'));

const executeJs = ({ args }) => {
  const patched = args.join('\n');
  const result = __cauldron__.evalScript(patched, 'repl');
  return `\xA77=> ${cauldron.pretty(result)}`;
}

const JsCommand = () => (
  <Command 
    name="js"
    permission="cauldron.js"
    execute={executeJs}
    description="Executes a JS snippet"
    usage="/<command> [snippet]">
    <Command name="debug" permission="debug" />
  </Command>
);

const app = Rinse.mount(<JsCommand />);