var EventEmitter = require('events');
var util = require('util');

function Stream() {
    EventEmitter.call(this);
}

util.inherits(Stream, EventEmitter);

Stream.prototype.pipe = function(dest, options) {
    var source = this;

    function ondata(chunk) {
        if (dest.writable && dest.write(chunk) === false && source.pause) {
            source.pause();
        }
    }

    source.on('data', ondata);

    function ondrain() {
        if (source.readable && source.resume) {
            source.resume();
        }
    }

    dest.on('drain', ondrain);

    var didOnEnd = false;
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

    function onerror(er) {
        cleanup();
        if (EventEmitter.listenerCount(this, 'error') === 0) {
            throw er;
        }
    }

    source.on('error', onerror);
    dest.on('error', onerror);

    function cleanup() {
        source.removeListener('data', ondata);
        dest.removeListener('drain', ondrain);

        source.removeListener('end', onend);
        source.removeListener('close', onclose);

        source.removeListener('error', onerror);
        dest.removeListener('error', onerror);

        source.removeListener('end', cleanup);
        source.removeListener('close', cleanup);

        dest.removeListener('close', cleanup);
    }
}

module.exports = Stream;