const { EventEmitter } = require('events');

class Stream extends EventEmitter {
  pipe(dest, options) {
    function ondata(chunk) {
      if (dest.writable && dest.write(chunk) === false && this.pause) {
        this.pause();
      }
    }
    this.on('data', ondata);
    function ondrain() {
      if (this.readable && this.resume) {
        this.resume();
      }
    }

    dest.on('drain', ondrain);
    // If the 'end' option is not supplied, dest.end() will be called when
    // this gets the 'end' or 'close' events.  Only dest.end() once.
    if (!dest._isStdio && (!options || options.end !== false)) {
      this.on('end', onend);
      this.on('close', onclose);
    }

    let didOnEnd = false;
    function onend() {
      if (didOnEnd) return;
      didOnEnd = true;
      dest.end();
    }

    function onclose() {
      if (didOnEnd) return;
      didOnEnd = true;
      if (typeof dest.destroy === 'function') dest.destroy();
    }

    function cleanup() {
      this.removeListener('data', ondata);
      dest.removeListener('drain', ondrain);
      this.removeListener('end', onend);
      this.removeListener('close', onclose);
      this.removeListener('error', onerror);
      dest.removeListener('error', onerror);
      this.removeListener('end', cleanup);
      this.removeListener('close', cleanup);
      dest.removeListener('close', cleanup);
    }
    // don't leave dangling pipes when there are errors.
    function onerror(er) {
      cleanup();
      if (EventEmitter.listenerCount(this, 'error') === 0) {
        throw er; // Unhandled stream error in pipe.
      }
    }

    this.on('error', onerror);
    dest.on('error', onerror);
    // remove all the event listeners that were added.
    this.on('end', cleanup);
    this.on('close', cleanup);
    dest.on('close', cleanup);
    dest.emit('pipe', this);
    // Allow for unix-like usage: A.pipe(B).pipe(C)
    return dest;
  }
}

module.exports = Stream;
