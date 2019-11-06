import { Command } from '@cauldron';
import PropTypes from 'prop-types';

const { CommandRestriction } = Command;

const CommandComponent = props => {
  const { name, isForConsole, isForPlayer, __parent, children } = props;
  let restriction;
  if (isForConsole && isForPlayer) {
    restriction = CommandRestriction.NONE;
  } else if (isForConsole && !isForPlayer) {
    restriction = CommandRestriction.CONSOLE_ONLY;
  } else if (!isForConsole && isForPlayer) {
    restriction = CommandRestriction.PLAYER_ONLY;
  } else {
    restriction = __parent
      ? __parent.restriction || CommandRestriction.NONE
      : CommandRestriction.NONE;
  }
  const command = new Command(name, { ...props, restriction });
  if (!__parent || !__parent.props.execute) {
    command.register();
  } else {
    let nextParent = __parent;
    let path = '';
    while (nextParent) {
      path = `${nextParent.props.name}.${path}`;
      nextParent = nextParent.props.__parent;
    }
    const parentCommand = Command.fromPath(path);
    parentCommand.addSubcommand(this.cauldronCommand).register();
  }
  return children;
};

CommandComponent.propTypes = {
  name: PropTypes.string.isRequired,
  execute: PropTypes.func,
  description: PropTypes.string,
  usage: PropTypes.string,
  aliases: PropTypes.arrayOf(PropTypes.string),
  permission: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.func),
  isForConsole: PropTypes.bool,
  isForPlayer: PropTypes.bool
};

CommandComponent.defaultProps = {
  execute() {},
  description: 'A Cauldron command',
  usage: '/<command>',
  aliases: [],
  permission: null,
  children: [],
  isForConsole: true,
  isForPlayer: true
};

export default CommandComponent;
