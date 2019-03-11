class AssertionError {
    constructor(options) {
        options = options || {};
        this.message = options.message;
        this.actual = options.actual;
        this.expected = options.expected;
        this.operator = options.operator;
        this.stackStartFn = options.stackStartFn;
    }
}

function assert(toCheck, error) {
    if (!toCheck) {
        if (!error) return false;
        else throw error;
    }
}

module.exports = assert;