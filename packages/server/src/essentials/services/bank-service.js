import { services } from 'cauldronjs';

services.use((server) => {
  const vault = server.getPluginManager().getPlugin('Vault');
});
