import { Module } from 'module';
import Rinse, { Command } from '@cauldron/rinse';
import { clearCommands } from 'cauldron';
import pretty from '@cauldron/pretty';
import colors from '@cauldron/colors';

const executeJs = ({ args }) => {
  const patched = args.join(' ');
  const result = $$cauldron$$.evalScript(patched, 'repl');
  return `\xA77=> ${pretty(result)}`;
};

const reloadJs = ({ sender }) => {
  console.error('Currently not working :)');
  // sender.sendMessage(colors.yellow('Reloading JavaScript context...'));
  // clearCommands();
  // // this shit ain't workin so lets reset all the events handlers & commands
  // // then re-run this file. If hard restart, call bootstrap instead. Idk.
  // Module.runMain();
  sender.sendMessage(colors.green('Finished reloading.'));
};

const JsCommand = () => (
  <Command
    name="js"
    permission="cauldron.js"
    execute={executeJs}
    description="Executes a JS snippet"
    usage="/<command> [snippet]"
  >
    <Command
      name="reload"
      permission="cauldron.js.reload"
      execute={reloadJs}
      description="Reloads the JavaScript environment"
    >
      <Command name="soft" execute={() => console.log('soft reload')} />
      <Command name="hard" execute={() => console.log('hard reload')} />
    </Command>
  </Command>
);

export default JsCommand;
