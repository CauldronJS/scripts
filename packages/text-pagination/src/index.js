import colors from '@cauldronjs/colors';
import { ChatColor } from 'bungee/api';
import {
  ClickEvent,
  HoverEvent,
  TextComponent,
  BaseComponent,
} from 'bungee/api/chat';
import { Text } from 'bungee/api/chat/hover/content';

const newLineComponent = () => new TextComponent('\n');
const noop = () => {};

/**
 *
 * @param {string[]|BaseComponent[]} content
 * @param {number} page
 * @param {{ maxPerPage?: number, header?: string, nextPageCommand?: (page: int) => string, previousPageCommand?: (page: int) => string}} config
 *
 * @returns {BaseComponent}
 */
export default function paginate(content, page, config) {
  const {
    maxPerPage = 10,
    header = 'Page {page} of {totalPages}',
    nextPageCommand = noop,
    previousPageCommand = noop,
  } = config;
  const totalPages = Math.ceil(content.length / maxPerPage);
  const startIndex = page * maxPerPage;
  const formattedHeader = header
    .replace('{page}', page + 1)
    .replace('{totalPages}', totalPages);
  const formattedContent = content
    .slice(startIndex, startIndex + maxPerPage)
    .filter((line) => line)
    .map((line) => {
      if (line.duplicate) {
        // it's a BaseComponent
        line.addExtra('\n');
        return line;
      } else {
        // it's a string
        return new TextComponent(`${line}\n`);
      }
    });
  const hasFooterDivider = page + 1 < totalPages && page > 0;
  const footerDivider = hasFooterDivider ? ` ${colors.reset('|')} ` : '';
  const footerPrevious = page > 0 ? colors.yellow('Previous') : '';
  const footerNext = page + 1 < totalPages ? colors.aqua('Next') : '';
  const headerComponent = new TextComponent(formattedHeader + '\n');
  const contentComponent = new TextComponent(formattedContent);
  const footerPreviousComponent = new TextComponent(footerPrevious);
  if (previousPageCommand && previousPageCommand.length > 0) {
    footerPreviousComponent.setClickEvent(
      new ClickEvent(ClickEvent.Action.RUN_COMMAND, previousPageCommand(page))
    );
  }
  const footerDividerComponent = new TextComponent(footerDivider);
  const footerNextComponent = new TextComponent(footerNext);
  if (nextPageCommand && nextPageCommand.length > 0) {
    footerNextComponent.setClickEvent(
      new ClickEvent(ClickEvent.Action.RUN_COMMAND, nextPageCommand(page))
    );
  }
  const components = [
    headerComponent,
    newLineComponent(),
    contentComponent,
    newLineComponent(),
    footerPreviousComponent,
    footerDividerComponent,
    footerNextComponent,
  ];
  return new TextComponent(...components);
}
