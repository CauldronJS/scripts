import { Objective, ObjectiveState } from './objective';

export class Quest {
  /**
   *
   * @param {string} name
   * @param {string} id
   * @param {...Objective} objectives
   */
  constructor(name, id, ...objectives) {
    this.name = name;
    this.id = id;
    this.objectives = objectives;
    if (!id) {
      throw new Error('Cannot create a quest without an ID');
    }
  }
}

export class QuestState {
  /**
   *
   * @param {Quest} quest
   * @param {import('bukkit/entity').Player} player
   */
  constructor(quest, player) {
    this.quest = quest;
    this.player = player;
    this.objectiveStates = quest.objectives.map(
      (objective) => new ObjectiveState(objective, player)
    );
  }
}
