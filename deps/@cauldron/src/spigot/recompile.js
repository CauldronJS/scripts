// this will create the /recompile command, following directories
// to see if recompilation is necessary
import useStore from '@cauldron/store';

const [compileCache, setCompileCache] = useStore('recompile');

export default function recompile(moduleName = '$main') {
  const previousHash = compileCache[moduleName];
  const currentHash = '';
  if (!previousHash || previousHash !== currentHash) {
    // compile
  }
}
