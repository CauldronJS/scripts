var errors = require('errors');

function format() {
    return formatWithOptions(null, Array.prototype.slice.call(arguments, 0));
}

function formatWithOptions(inspectOptions, f) {
    var i, tempStr;
    if (typeof f !== 'string') {
        if (arguments.length === 1) return '';
        var res = '';
        for (i = 1; i < arguments.length - 1; i++) {
            res += inspect(arguments[i], inspectOptions);
            res += ' ';
        }
        res += inspect(arguments[i], inspectOptions);
        return res;
    }

    if (arguments.length === 2) return f;

    var str = '';
    var a = 2;
    var lastPos = 0;
    for (i = 0; i < f.length - 1; i++) {
        if (f.charCodeAt(i) === 37) {
            var nextChar = f.charCodeAt(++i);
            if (a !== arguments.length) {
                switch (nextChar) {
                    case 115:
                        tempStr = String(arguments[a++]);
                        break;
                    case 106:
                        tempStr = arguments[a++].toString();
                        break;
                    case 100:
                        tempStr = '' + Number(arguments[a++]);
                        break;
                    case 79:
                        tempStr = inspect(arguments[a++], inspectOptions);
                        break;
                    case 111:
                        tempStr = inspect(arguments[a++], {
                            showHidden: true,
                            showProxy: true,
                            depth: 4
                        });
                        break;
                    case 105:
                        tempStr = '' + parseInt(arguments[a++]);
                        break;
                    case 102:
                        tempStr = '' + parseFloat(arguments[a++]);
                        break;
                    case 37:
                        str += f.slice(lastPos, i);
                        lastPos = i + 1;
                        continue;
                    default:
                        continue;
                }

                if (lastPos !== i - 1) str += f.slice(lastPos, i - 1);
                str += tempStr;
                lastPos = i + 1;
            } else if (nextChar === 37) {
                str += f.slice(lastPos, i);
                lastPos = i + 1;
            }
        }
    }

    if (lastPos === 0) str = f;
    else if (lastPos < f.length) str += f.slice(lastPos);
    while (a < arguments.length) {
        var x = arguments[a++];
        if ((typeof x !== 'object' && typeof x !== 'symbol') || x === null) {
            str += ' ' + x;
        } else {
            str += ' ' + inspect(x, inspectOptions);
        }
    }

    return str;
}

function inspect(value, opts) {
    return value; // TODO? maybe?
}

function inherits(ctor, superCtor) {
    if (ctor === undefined || ctor === null) throw new errors.ERR_INVALID_ARG_TYPE('ctor', 'Function', ctor);
    if (superCtor === undefined || superCtor === null) throw new errors.ERR_INVALID_ARG_TYPE('superCtor', 'Function', superCtor);
    if (superCtor.prototype === undefined) {
        throw new ERR_INVALID_ARG_TYPE('superCtor.prototype', 'Function', superCtor.prototype);
    }

    ctor.super_ = superCtor;
    Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
}

function isConsole(target) {
    return target instanceof org.bukkit.command.ConsoleCommandSender;
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

module.exports = exports = {
    format,
    formatWithOptions,
    inherits,
    isConsole,
    JavaClass
}