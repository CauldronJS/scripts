const SERVER_VERSION = $$cauldron$$.getTarget().getVersion();

// eslint-disable-next-line no-undef
const mc = Packages.net.minecraft.server[SERVER_VERSION];

export default mc;
