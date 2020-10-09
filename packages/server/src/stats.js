import Rinse, { Command } from '@cauldron/rinse';
import { Statistic } from 'bukkit';
import colors from '@cauldron/colors';
import textPagination from '@cauldron/text-pagination';

/**
 *
 * @param {Statistic} stat
 */
function makeStatReadable(stat) {
  const words = stat
    .toString()
    .split('_')
    .map((word) => `${word[0].toUpperCase()}${word.substr(1).toLowerCase()}`);
  return words.join(' ');
}

function executeStats({ sender, args }) {
  let page = args.filter((arg) => !isNaN(arg))[0];
  if (!page) {
    page = 0;
  }
  const stats = Object.getOwnPropertyNames(Statistic);
  const result = [];
  for (let stat of stats) {
    if (!Statistic[stat]) {
      continue;
    }
    try {
      const value = sender.getStatistic(Statistic[stat]);
      result.push(
        `${colors.aqua(makeStatReadable(stat))}: ${colors.white(value)}`
      );
    } catch (err) {
      // ignore because fuck it
    }
  }
  const paginated = textPagination(result, page, {
    maxPerPage: 10,
    header: 'Stats ({page})',
    nextPageCommand: (page) => `/stats ${page + 1}`,
    previousPageCommand: (page) => `/stats ${page - 1}`,
  });
  return paginated;
}

const StatsCommand = () => (
  <Command
    name="stats"
    execute={executeStats}
    usage="/<command> [...stats]"
    isForPlayer
  />
);

export default StatsCommand;
