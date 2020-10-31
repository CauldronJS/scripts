export class QuestRules {
  /**
   *
   * @param {number?} timeLimit
   */
  constructor(timeLimit) {
    this.timeLimit = timeLimit;
  }
}

export class GoToLocationRules extends QuestRules {
  /**
   *
   * @param {import('bukkit').Location} location
   * @param {number?} timeLimit
   */
  constructor(location, timeLimit) {
    super(timeLimit);
    this.location = location;
  }
}

export class KillNamedEntityRules extends QuestRules {
  constructor(name, timeLimit) {
    super(timeLimit);
    this.name = name;
  }
}

export class KillUnnamedEntityRules extends QuestRules {
  constructor(entityType, timeLimit) {
    super(timeLimit);
    this.entityType = entityType;
  }
}

export class GetItemsRules extends QuestRules {
  constructor(itemStack, timeLimit) {
    super(timeLimit);
    this.itemStack = itemStack;
  }
}

export class BreakBlocksRules extends QuestRules {
  constructor(locations, itemStack, withItem, timeLimit) {
    super(timeLimit);
    this.locations = locations;
    this.itemStack = itemStack;
    this.withItem = withItem;
  }
}

export class PlaceBlocksRules extends QuestRules {
  constructor(locations, itemStack, timeLimit) {
    super(timeLimit);
    this.location = locations;
    this.itemStack = itemStack;
  }
}

export class UseItemRules extends QuestRules {
  constructor(location, itemStack, timeLimit) {
    super(timeLimit);
    this.location = location;
    this.itemStack = itemStack;
  }
}

export class EnchantItemRules extends QuestRules {
  constructor(
    enchantingTableLocation,
    itemStack,
    enchantment,
    enchantmentLevel,
    timeLimit
  ) {
    super(timeLimit);
    this.enchantingTableLocation = enchantingTableLocation;
    this.itemStack = itemStack;
    this.enchantment = enchantment;
    this.enchantmentLevel = enchantmentLevel;
  }
}

export class CraftItemRules extends QuestRules {
  constructor(craftingTableLocation, itemStack, timeLimit) {
    super(timeLimit);
    this.craftingTableLocation = craftingTableLocation;
    this.itemStack = itemStack;
  }
}

export class SmeltItemRules extends QuestRules {
  constructor(forgeLocation, itemStack, timeLimit) {
    super(timeLimit);
    this.forgeLocation = forgeLocation;
    this.itemStack = itemStack;
  }
}

export class RepairItemRules extends QuestRules {
  constructor(anvilLocation, itemStack, timeLimit) {
    super(timeLimit);
    this.anvilLocation = anvilLocation;
    this.itemStack = itemStack;
  }
}

export class SellItemRules extends QuestRules {
  constructor(traderId, itemStack, timeLimit) {
    super(timeLimit);
    this.traderId = traderId;
    this.itemStack = itemStack;
  }
}

export class BuyItemRules extends QuestRules {
  constructor(traderId, itemStack, timeLimit) {
    super(timeLimit);
    this.traderId = traderId;
    this.itemStack = itemStack;
  }
}
