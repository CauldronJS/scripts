import { identityHashCode } from '@java/java.lang.System';

class Pipe {
  static mount (app) {
    this._mounted = app;
  }
}

Pipe._mounted = null;
Pipe._cachedComponents = Object.create(null);

export default Pipe;
