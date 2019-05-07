import cauldron, { Command } from 'cauldron';
import Rinse from '@cauldron/rinse';
import Qa from './qame';


cauldron();
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
    usage="/<command> [snippet]"
  />
);

const app = Rinse.mount(<JsCommand />);