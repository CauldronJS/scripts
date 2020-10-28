import Rinse, { Command } from '@cauldronjs/rinse';
import colors from '@cauldronjs/colors';
import textPagination from '@cauldronjs/text-pagination';
import { services } from 'cauldronjs';
import useConfig from '@cauldronjs/config';
import { Bukkit } from 'bukkit';
import { ClickEvent, TextComponent } from 'bungee/api/chat';

const [config, setConfig] = useConfig('better-help', { omittedTopics: [] });
const allTopics = () => [...Bukkit.getHelpMap().getHelpTopics()];

function executeHelp({ sender, args }) {
  let [page = 0, findTopic] = args;
  if (typeof page === 'string') {
    findTopic = page;
    page = 0;
  }
  const topics = allTopics();
  // topic === null ? allTopics : [Bukkit.getHelpMap().getHelpTopic(topic)];
  const paginated = textPagination(
    topics
      .map((topic) => {
        if (
          findTopic &&
          topic.getName().substr(1) !== findTopic.toLowerCase()
        ) {
          return null;
        }
        const content = `${colors.gold(
          topic.getName()
        )}: ${topic.getShortText()}`;
        const component = new TextComponent(content);
        component.setClickEvent(
          new ClickEvent(
            ClickEvent.Action.RUN_COMMAND,
            `${topic.getName()} help`
          )
        );
        return component;
      })
      .filter((item) => item),
    page,
    {
      maxPerPage: 8,
      header: `${colors.yellow(
        '---------'
      )} Help: ({page}/{totalPages}) ${colors.yellow('---------')}`,
      nextPageCommand: (page) => `/help ${page + 1}`,
      previousPageCommand: (page) => `/help ${page - 1}`,
    }
  );
  return paginated;
}

/**
 *
 * @param {import('cauldronjs').CauldronCommand} command
 */
function processHelpRequest(command) {
  return `${colors.gold(
    command.usage.replace('<command>', command.name)
  )}\n${colors.gold('Description')}: ${command.description}`;
}

function executeExcludeFromHelp({ sender, args }) {}

const BetterHelp = () => (
  <Command
    name="help"
    usage="/<command> [page|topic]"
    execute={executeHelp}
    help={processHelpRequest}
    description="Shows the player a list of commands with descriptions"
  >
    <Command
      name="excludefrom"
      permission="betterhelp.admin"
      execute={executeExcludeFromHelp}
    />
  </Command>
);

export default BetterHelp;
