import commands from './commands';

const essentialsService = (server) => {
  if (
    server.getPluginManager().isPluginEnabled('Essentials') &&
    !process.env.OVERRIDE_ESSENTIALS
  ) {
    console.log(
      "Essentials plugin found, skipping Cauldron Essentials to prevent conflict. If you'd like to use Cauldron Essentials instead, use the environment variable OVERRIDE_ESSENTIALS=true"
    );
    return false;
  }
  // load commands
  commands();
  return true;
};

export default essentialsService;
