const jestConfig = {
  testRegex: '__tests__[\\/].+(spec\\.jest)\\.js$',
  reporters: ['default'],
  collectCoverageFrom: [
    'src/**',
    '!**/deps/**',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/yui_sdk/**'
  ]
};

module.exports = jestConfig;
