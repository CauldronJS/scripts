const cauldronTypes = require('internal/cauldron/types');

exports.build = () => {
  // define new global types
  Object.defineProperties(
    global,
    Object.getOwnPropertyDescriptors(cauldronTypes)
  );
};
