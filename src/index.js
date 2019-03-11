import { createCommand, alias } from 'cauldron';

createCommand('test', {
  description: 'This is a test', execute({ args }) {
    return `You tested ${args.join(', ')}`;
  }
});

const helloWorld = () => console.log('Hello world');
alias(helloWorld);