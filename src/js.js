import Rinse from '@cauldron/rinse';
import { Command } from '@cauldron';
import pretty from '@cauldron/pretty';

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

export default JsCommand;
