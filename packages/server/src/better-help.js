import Rinse, { Command } from '@cauldronjs/rinse';
import colors from '@cauldronjs/colors';
import textPagination from '@cauldronjs/text-pagination';
import { services } from 'cauldronjs';
import useConfig from '@cauldronjs/config';
import { Bukkit } from 'bukkit';
import { ClickEvent, TextComponent } from 'bungee/api/chat';

const [config, setConfig] = useConfig('better-help', { omittedTopics: [] });
const allTopics = [...Bukkit.getHelpMap().getHelpTopics()];

function executeHelp({ sender, args }) {
  let [page = 0] = args;
  const topics = allTopics;
  // topic === null ? allTopics : [Bukkit.getHelpMap().getHelpTopic(topic)];
  const paginated = textPagination(
    topics.map((topic) => {
      const content = `${colors.gold(
        topic.getName()
      )}: ${topic.getShortText()}`;
      const component = new TextComponent(content);
      component.setClickEvent(
        new ClickEvent(ClickEvent.Action.RUN_COMMAND, topic.getName())
      );
      return component;
    }),
    page,
    {
      maxPerPage: 5,
      header: `${colors.yellow(
        '---------'
      )} Help: ({page}/{totalPages}) ${colors.yellow('---------')}`,
      nextPageCommand: (page) => `/help ${page + 1}`,
      previousPageCommand: (page) => `/help ${page - 1}`,
    }
  );
  return paginated;
}

function executeExcludeFromHelp({ sender, args }) {}

const BetterHelp = () => (
  <Command name="help" usage="/<command> [page|topic]" execute={executeHelp}>
    <Command
      name="excludefrom"
      permission="beterhelp.admin"
      execute={executeExcludeFromHelp}
    />
  </Command>
);

export default BetterHelp;
