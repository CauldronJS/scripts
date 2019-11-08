const { options, aliases } = process.config.variables;

function getOptionValue(option) {
  return options[option];
}

module.exports = {
  options,
  aliases,
  getOptionValue
};
