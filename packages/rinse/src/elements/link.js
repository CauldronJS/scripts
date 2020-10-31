import { ChatColor } from 'bungee/api';
import { ClickEvent, HoverEvent, TextComponent } from 'bungee/api/chat';

const LinkComponent = (props) => {
  console.log('Creating link component');
  const text = new TextComponent(...(props.children || []));
  text.setColor(ChatColor[props.color?.toUpperCase() || 'RESET']);
  text.setUnderlined(true);
  text.setClickEvent(new ClickEvent(ClickEvent.Action.OPEN_URL, props.href));
  text.setHoverEvent(new HoverEvent(HoverEvent.Action.SHOW_TEXT, props.href));
  return text;
};

export default LinkComponent;
