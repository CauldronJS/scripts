// shuts down the server after a given amount of time
import { subMinutes } from 'date-fns';
import { scheduleLater } from '@cauldronjs/spigot';

/**
 *
 * @param {Date} duration
 */
export default function timedShutdown(duration) {
  // dates yay
  const shutdownAt = Date.now() + duration.valueOf();
  const warnAt = subMinutes(shutdownAt, 5);
}
