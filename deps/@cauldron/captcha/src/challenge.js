import colors from '@cauldron/colors';

function mathChallenge() {
  const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
  };
  const chosenOp = Object.keys(operations)[Math.floor(Math.random() * 5)];
  const expression = {
    a: Math.floor(Math.random() * 11),
    b: Math.floor(Math.random() * 11),
    operation: chosenOp
  };
  const message = `Do the math: ${expression.a} ${expression.operation} ${
    expression.b
  }`;
  const answer = operations[chosenOp](expression.a, expression.b);
  return { message, answer };
}

function wordChallenge() {}

const challenges = [mathChallenge];

export const generateChallenge = () =>
  challenges[Math.floor(Math.random() * challenges.length)];

export const validateChallenge = (challenge, response) => {
  if (typeof challenge.answer === 'number') {
    return challenge.answer === parseInt(response);
  } else if (typeof challenge.answer === 'boolean') {
    if (response.toLowerCase() === 'yes') {
      return challenge.answer === true;
    } else if (response.toLowerCase() === 'no') {
      return challenge.answer === false;
    } else {
      return false;
    }
  } else {
    return challenge.answer === response;
  }
};
