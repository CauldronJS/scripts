import Rinse from '@cauldron/rinse';
import { Command } from '@cauldron/core';

export const CaptchaCommand = () => (
  <Command name="captcha" permission="captcha" exec={console.log}>
    <Command name="verify" />
    <Command name="debug" permission="debug" />
  </Command>
);
