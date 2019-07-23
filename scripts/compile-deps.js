const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const deps = fs.readdirSync('../deps/@cauldron');
