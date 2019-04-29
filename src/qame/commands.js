import { createCommand } from 'cauldron';

createCommand('qame', {
  description: 'Begins a QA session for the logged in user',
  permission: 'qame',
  execute ({ sender, args, useState }) {

  }
});
