import Rinse, { Command } from '@cauldronjs/rinse';
import { parseExpression } from '@babel/parser';
import pretty from '@cauldronjs/pretty';
import colors from '@cauldronjs/colors';
import { Bukkit } from 'bukkit';

const executeJs = ({ args, sender }) => {
  let patched = args.join(' ');
  if (patched.indexOf('\n') === -1 && !patched.startsWith('return ')) {
    patched = `return ${patched}`;
  }
  const wrapper = '(function(me,require,server){' + patched + '})';
  const fn = $$isolate$$.runScript(wrapper, 'repl');
  const result = fn.call(this, sender, require.mainRequire, Bukkit);
  return `\xA77=> ${pretty(result)}`;
};

const tabCompleteJs = (sender, ...script) => {
  const parsed = parseExpression(script.join(' '), {
    plugins: [
      '@babel/plugin-syntax-jsx',
      [
        '@babel/plugin-transform-react-jsx',
        { pragma: 'Rinse.createComponent', pragmaFrag: 'Rinse.Fragment' },
      ],
      '@babel/plugin-transform-modules-commonjs',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-optional-chaining',
    ],
  });
  if (!parsed.object) {
    // the first part of the identifier hasn't been input yet, ignore for subcommands
    return;
  }
  const g = parsed.object.name;
  const value = eval(g);
  return Object.getOwnPropertyNames(value);
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
    tabComplete={tabCompleteJs}
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
