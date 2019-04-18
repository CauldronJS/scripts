import cauldron from 'cauldron';
import { MongoClient } from 'mongodb';

cauldron.initialize();
cauldron.events.server.on('listping', async ({ setMotd }) => { await setMotd('Testing') });

const client = new MongoClient('mongodb://localhost:27017');
client.connect(err => {
  if (err) {
    return console.error(err);
  }
  console.log('Successfully connected to mongo');
  const db = client.db('cauldron');
});
