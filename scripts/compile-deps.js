const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const recursive = require('recursive-readdir');

const depsdir = path.join(process.cwd(), 'deps');
const nodepkgdir = path.join(process.cwd(), 'node_modules');

function buildPackage(pkg) {
  try {
    const nodepkgname = pkg.replace(depsdir, nodepkgdir);
    console.log(`Building ${pkg} to ${nodepkgname}`);
    const build = childProcess.execSync(
      `babel ${pkg} --out-dir ${nodepkgname} --copy-files`
    );
    console.log(build.toString());
  } catch (err) {
    console.error(err);
  }
}

recursive(depsdir, (err, files) => {
  const pkgs = files
    .filter(file => path.basename(file) === 'package.json')
    .map(path.dirname);
  pkgs.forEach(buildPackage);
});
