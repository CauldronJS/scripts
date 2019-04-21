const { EventEmitter } = require('events');

class Stream extends EventEmitter {
  pipe (dest, options) {
    const ondata = chunk => {
      if (dest.writable && dest.write(chunk) === false && source.pause) {
        this.pause();
      }
    }
    this.on('data', ondata);

    const ondrain = () => {
      if (this.readable && this.resume) {
        this.resume();
      }
    }
    dest.on('drain', ondrain);

    let didOnEnd = false;
    const onend = () => {
      if (didOnEnd) return;
      didOnEnd = true;
      dest.end();
    }

    const onclose = () => {
      if (didOnEnd) return;
      didOnEnd = true;
      if (typeof dest.destroy === 'function') dest.destroy();
    }

    // If the 'end' option is not supplied, dest.end() will be called when
    // source gets the 'end' or 'close' events.  Only dest.end() once.
    if (!dest._isStdio && (!options || options.end !== false)) {
      this.on('end', onend);
      this.on('close', onclose);
    }

    function cleanup () {
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

    this.on('end', cleanup);
    this.on('close', cleanup);
    dest.on('close', cleanup);
    dest.emit('pipe', this);

    this.on('error', onerror);
    dest.on('error', onerror);
  }
}

module.exports = Stream;
