import { createCommand } from 'cauldron';

createCommand('test', {
  description: 'This is a test', execute({ sender, label, args }) {
    sender.sendMessage(`You tested ${args.join(', ')}`);
    return true;
  }
});