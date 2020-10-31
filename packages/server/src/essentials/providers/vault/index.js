// this is meant to polyfill Vault for JS usage
// TODO: make this its own package
import useStore from '@cauldronjs/store';
import { Bukkit } from 'bukkit';

const [banks, setBanks] = useStore('essentials-economy-banks', {});
const [economyStore, setEconomyStore] = useStore(
  'essentials-economy-players',
  {}
);

export const ResponseType = {
  FAILURE: 0,
  NOT_IMPLEMENTED: 1,
  SUCCESS: 2,
};

export class EconomyResponse {
  /**
   *
   * @param {number} amount
   * @param {number} balance
   * @param {ResponseType} type
   * @param {string} errorMessage
   */
  constructor(amount, balance, type, errorMessage) {
    this.amount = amount;
    this.balance = balance;
    this.type = type;
    this.errorMessage = errorMessage;
  }
}

function getBankInfo(name) {
  const player =
    Bukkit.getPlayerExact(name) ||
    Bukkit.getPlayer(name) ||
    Bukkit.getOfflinePlayer(name);
  const id = player ? player.getUniqueId().toString : null;
  return [id, economyStore[id]];
}

function error(message, id = null) {
  const balance = economyStore[id];
  return new EconomyResponse(balance, balance, ResponseType.FAILURE, message);
}

function noNegativeAmountsError() {
  return new EconomyResponse(
    null,
    null,
    ResponseType.FAILURE,
    'The amount cannot be negative'
  );
}

function noBankFoundError() {
  return new EconomyResponse(
    null,
    null,
    ResponseType.FAILURE,
    'No bank exists with that name'
  );
}

function noUserFoundError() {
  return new EconomyResponse(
    null,
    null,
    ResponseType.FAILURE,
    'That user does not exist'
  );
}

function noAccountError() {
  return new EconomyResponse(
    null,
    null,
    ResponseType.FAILURE,
    'That user does not have an account'
  );
}

function success(amount, balance) {
  return new EconomyResponse(amount, balance, ResponseType.SUCCESS, null);
}

function normalizeAmount(amount) {
  const float = parseFloat(amount);
  if (float.toString() === amount) {
    return float;
  } else {
    return NaN;
  }
}

export class Economy {
  bankBalance(name) {
    const [id, balance] = getBankInfo(name);
    if (!id) {
      return noUserFoundError();
    }
    if (!balance) {
      return noAccountError();
    }
    return success(balance, balance);
  }

  bankDeposit(name, amount) {
    const [id, balance] = getBankInfo(name);
    if (amount < 0) {
      return noNegativeAmountsError();
    }
    if (!id) {
      return noUserFoundError();
    }
    if (!balance) {
      return noAccountError();
    }
    const amountAsFloat = normalizeAmount(amount);
    if (isNaN(amountAsFloat)) {
      return error('Invalid amount: use numbers');
    }
    setEconomyStore({ [id]: balance + amountAsFloat });
    return success(amountAsFloat, balance);
  }

  bankHas(name, amount) {
    const [id, balance] = getBankInfo(name);
    if (amount < 0) {
      return error('The amount cannot be negative', id);
    }
    if (!id) {
      return error('That user does not exist');
    }
    if (!balance) {
      return error('That user does not have an account');
    }
    const amountAsFloat = normalizeAmount(amount);
    if (isNaN(amountAsFloat)) {
      return error('Invalid amount: use numbers');
    }
    return new EconomyResponse(
      amountAsFloat,
      balance,
      balance >= amount ? ResponseType.SUCCESS : ResponseType.FAILURE,
      null
    );
  }

  bankWithdraw(name, amount) {
    const [id, balance] = getBankInfo(name);
    if (amount < 0) {
      return error('The amount cannot be negative', id);
    }
    if (!id) {
      return error('That user does not exist');
    }
  }
}
