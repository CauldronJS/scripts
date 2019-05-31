import Rinse from '@cauldron/rinse';
import { Command } from '@cauldron';

export const CaptchaCommand = () => (
  <Command name="captcha" permission="captcha" exec={console.log} isForPlayer>
    <Command name="verify" />
    <Command name="debug" permission="debug" />
  </Command>
);
