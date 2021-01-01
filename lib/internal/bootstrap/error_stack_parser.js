const CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;

function extractLocation(urlLike) {
  // Fail-fast but return locations like "(native)"
  if (urlLike.indexOf(':') === -1) {
    return [urlLike];
  }

  const regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
  const parts = regExp.exec(urlLike.replace(/[()]/g, ''));
  return [parts[1], parts[2] || undefined, parts[3] || undefined];
}

function parse(error) {
  const filtered = error.stack.split('\n').filter(function (line) {
    return !!line.match(CHROME_IE_STACK_REGEXP);
  }, this);

  return filtered.map(function (line) {
    if (line.indexOf('(eval ') > -1) {
      // Throw away eval information until we implement stacktrace.js/stackframe#8
      line = line
        .replace(/eval code/g, 'eval')
        .replace(/(\(eval at [^()]*)|(\),.*$)/g, '');
    }
    let sanitizedLine = line.replace(/^\s+/, '').replace(/\(eval code/g, '(');

    // capture and preseve the parenthesized location "(/foo/my bar.js:12:87)" in
    // case it has spaces in it, as the string is split on \s+ later on
    const location = sanitizedLine.match(/ (\((.+):(\d+):(\d+)\)$)/);

    // remove the parenthesized location from the line, if it was matched
    sanitizedLine = location
      ? sanitizedLine.replace(location[0], '')
      : sanitizedLine;

    const tokens = sanitizedLine.split(/\s+/).slice(1);
    // if a location was matched, pass it to extractLocation() otherwise pop the last token
    const locationParts = extractLocation(
      location ? location[1] : tokens.pop()
    );
    const functionName = tokens.join(' ') || undefined;
    const fileName =
      ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1
        ? undefined
        : locationParts[0];

    return new StackFrame({
      functionName,
      fileName,
      lineNumber: locationParts[1],
      columnNumber: locationParts[2],
      source: line,
    });
  }, this);
}

module.exports = {
  parse,
};
