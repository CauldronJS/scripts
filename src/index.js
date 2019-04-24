import cauldron from 'cauldron';

cauldron.initialize();
cauldron.events.server.on('listping', ({ setMotd }) => setMotd('Testing'));
