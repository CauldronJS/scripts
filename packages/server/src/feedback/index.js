import Rinse, { Command } from '@cauldronjs/rinse';
import colors from '@cauldronjs/colors';
import { ClickEvent, TextComponent } from 'bungee/api/chat';

const formUrl = 'https://forms.gle/SHwyscnwszPmdn788';

function executeFeedbackRequest() {
  const alert = new TextComponent(
    colors.green(colors.underline('Please click this to open the form.'))
  );
  alert.setClickEvent(new ClickEvent(ClickEvent.Action.OPEN_URL, formUrl));
  return alert;
}

const FeedbackCommand = () => (
  <Command
    name="feedback"
    help="Shows the feedback interface"
    execute={executeFeedbackRequest}
  />
);

export default FeedbackCommand;
