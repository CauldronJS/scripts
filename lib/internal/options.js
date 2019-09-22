const { options, aliases } = process.config;

function getOptionValue(option) {
  return options[option];
}

module.exports = {
  options,
  aliases,
  getOptionValue
};
