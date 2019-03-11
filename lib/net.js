var EventEmitter = require('events');
var util = require('util');
var internalUtil = require('internal/util');
var Server = require('internal/net/server');
var Socket = require('internal/net/socket');
var netUtils = require('internal/net/utils');
var buffer = require('buffer');
var isLegalPort = inet.isLegalPort;
var normalizedArgsSymbol = inet.normalizedArgsSymbol;
var makeSyncWrite = inet.makeSyncWrite;

function connect() {
    if (typeof arguments[0] === 'string') {
        // connect(path, connectListener)
    } else if (typeof arguments[0] === 'number') {
        // connect(port, host, connectListener)
    } else {
        // connect(options, connectListener)
    }
}

function createConnection() {
    if (typeof arguments[0] === 'string') {
        // createConnection(path, connectListener)
    } else if (typeof arguments[0] === 'number') {
        // createConnection(port, host, connectListener)
    } else {
        // createConnection(options, connectListener)
    }
}

function createServer(options, connectionListener) {

}

module.exports = {
    Server,
    Socket,
    isIP: netUtils.isIP,
    isIPv4: netUtils.isIPv4,
    isIPv6: netUtils.isIPv6,
    connect,
    createConnection,
    createServer
}