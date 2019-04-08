import cauldron from 'cauldron';
import * as friends from './friends';

cauldron.initialize();
cauldron.events.server.on('listping', ({ setMotd }) => setMotd('Testing'));
