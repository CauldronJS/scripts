function assert(toCheck, error) {
    if (!toCheck) {
        if (!error) return false;
        else throw error;
    }
}

module.exports = assert;
global.assert = assert; // because we kinda need this everywhere. Not good to have globally, but fuck it