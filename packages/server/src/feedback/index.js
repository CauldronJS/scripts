import Rinse, { Command } from '@cauldronjs/rinse';

const formUrl = 'https://forms.gle/SHwyscnwszPmdn788';

const FeedbackCommand = () => (
  <Command
    name="feedback"
    help="Shows the feedback interface"
    execute={() => (
      <a href={formUrl} color="green">
        Click on me to submit feedback
      </a>
    )}
  />
);

export default FeedbackCommand;
