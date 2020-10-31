import { EventEmitter } from 'events';
import { registerWatch } from './objective-service';
import { QuestRules } from './rules';

export const ObjectiveType = {
  GO_TO_LOCATION: 0,
  KILL_NAMED_ENTITY: 1,
  KILL_UNNAMED_ENTITY: 2,
  GET_ITEMS: 3,
  BREAK_BLOCKS: 4,
  PLACE_BLOCKS: 5,
  USE_ITEM: 6,
  ENCHANT_ITEM: 7,
  CRAFT_ITEM: 8,
  SMELT_ITEM: 9,
  REPAIR_ITEM: 10,
  SELL_ITEM: 11,
  BUY_ITEM: 12,
};

export class Objective {
  /**
   *
   * @param {number} type
   * @param {string} description
   * @param {string} id
   */
  constructor(type, description, id) {
    this.type = type;
    this.description = description;
    this.id = id;
    if (!id) {
      throw new Error('Cannot create an objective without an ID');
    }
  }
}

export class ObjectiveState extends EventEmitter {
  /**
   *
   * @param {Objective} objective
   * @param {import('bukkit/entity').Player} player
   * @param {QuestRules} rules
   * @param {boolean} isOptional
   */
  constructor(objective, player, rules, isOptional = false) {
    this.objective = objective;
    this.player = player;
    /**
     * The rule configuration of the objective
     */
    this.rules = rules;
    /**
     * Time in milliseconds when the objective is due. It will be null if it has no due date.
     */
    this.dueAt = rules.timeLimit ? Date.now() + rules.timeLimit : null;
    /**
     * Whether or not the objective is optional
     */
    this.isOptional = isOptional;
    /**
     * Whether or not the objective is complete
     */
    this.isComplete = false;
    /**
     * Whether or not the objective is available for completion
     */
    this.isOpen = false;
  }

  isEngagedInThisObjective(player) {
    return this.player.getUniqueId() === player.getUniqueId();
  }

  open() {
    this.isOpen = true;
    this.cancelToken = registerWatch(this);
    this.emit('open');
  }

  complete() {
    this.isComplete = true;
    this.emit('complete');
  }

  checkIsComplete() {
    if (this.isComplete) {
      this.cancelToken?.unregister();
      delete this.cancelToken;
      console.log('Completed objective');
    }
    return this.isComplete;
  }
}
