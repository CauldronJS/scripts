import { Command } from 'cauldron';
import Rinse from '@cauldron/rinse';

const getInfo = ({isServer}) => {
  if (isServer) {
    return '0 QA sessions running';
  }
}

const getStatus = ({args, sender, useState}) => {
  const ticketId = args[0];
  if (!ticketId) {
    // return the current QA session status
  } else {

  }
}

const startSession = ({args, sender, useState}) => {

}

const endSession = ({args, sender, useState}) => {

}

const getSession = ({args, sender, useState}) => {

}

const QaCommand = () => (
  <Command name="qa" permission="qa" usage="/<command>" execute={getInfo}>
    <Command name="status" permission="status" execute={getStatus} />
    <Command name="session" permission="session" execute={getSession}>
      <Command name="start" permission="start" execute={startSession} />
      <Command name="end" permission="end" execute={endSession} />
    </Command>
  </Command>
);

export default QaCommand;