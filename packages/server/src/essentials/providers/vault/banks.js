import useStore from '@cauldronjs/store';

const [registeredBanks, setRegisteredBanks] = useStore('vault-banks', {});

function amountAsFloat(amount) {
  const float = parseFloat(amount);
  return float.toString() === amount ? float : null;
}

class Bank {
  constructor(name, balance = 0) {
    this.name = name;
    this.balance = balance;
  }

  deposit(amount) {
    const float = amountAsFloat(amount);
    if (!float) return false;
    this.balance += float;
    this.save();
    return this.balance;
  }

  withdraw(amount) {
    const float = amountAsFloat(amount);
    if (!float) return false;
    this.balance -= float;
    this.save();
    return this.balance;
  }

  has(amount) {
    const float = amountAsFloat(amount);
    if (!float) return false;
    return this.balance >= float;
  }

  save() {
    setRegisteredBanks({ [this.name]: this.balance });
  }

  static fromJSON(json) {
    return new Bank(json[name], json[balance] || 0);
  }
}

/**
 *
 * @param {string} name
 *
 * @returns {Bank}
 */
export function createBank(name) {
  const bank = new Bank(name);
  bank.save();
  return bank;
}

/**
 *
 * @param {string} name
 *
 * @returns {Bank}
 */
export function getBank(name) {
  return registeredBanks[name];
}

/**
 *
 * @param {string} name
 *
 * @returns {boolean}
 */
export function deleteBank(name) {
  if (!registeredBanks[name]) {
    return false;
  }
  setRegisteredBanks({ [name]: undefined });
  return true;
}

/**
 * @returns {string[]}
 */
export function getBanks() {
  return Object.getOwnPropertyNames(registeredBanks);
}
