import { Material } from 'bukkit';
import { YamlConstructor } from 'bukkit/configuration/file';

export const customBlockState = name => (value, state = null) =>
  `${name}${state ? `_${state}` : ''}=${value}`;

class Validator {
  constructor(fn) {
    this.fn = fn;
  }

  for() {
    throw new Error('Validator.for must be instantiated');
  }

  static array(...values) {
    return new ArrayValidator(...values);
  }

  static boolean() {
    return new BooleanValidator();
  }

  static number(from, to) {
    return new NumberValidator(from, to);
  }
}

class ArrayValidator extends Validator {
  constructor(...values) {
    super(input =>
      Array.isArray(input)
        ? input.every(item => values.indexOf(item) > -1)
        : values.indexOf(input) > -1
    );
    this.values = values;
  }

  for(name, ...values) {
    return `${name}=${values.join('|')}`;
  }
}

class BooleanValidator extends Validator {
  constructor() {
    super(input => typeof input === 'boolean');
  }

  for(name, value) {
    return `${name}=${value}`;
  }
}

class NumberValidator extends Validator {
  constructor(from, to) {
    super(input => input >= from && input < to);
    this.from = from;
    this.to = to;
  }

  for(name, ...values) {
    return `${name}=${values.join('|')}`;
  }
}

export const VARIANTS = {
  FACING: Validator.array('north', 'south', 'west', 'east', 'down', 'up'),
  DAMAGE: Validator.array(
    'broken',
    'slightly_damaged',
    'undamaged',
    'very_damaged'
  ),
  DIRECTION: Validator.number(0, 4),
  AGE: Validator.number(0, 26),
  LEAVES: Validator.array('none', 'large', 'small'),
  STAGE: Validator.number(0, 4),
  ROTATION: Validator.number(0, 16),
  OCCUPIED: Validator.boolean(),
  PART: Validator.array('head', 'foot'),
  ATTACHMENT: Validator.string(
    'ceiling',
    'double_wall',
    'floor',
    'single_wall'
  ),
  POWERED: Validator.boolean(),
  LIT: Validator.boolean(),
  AXIS: Validator.array('x', 'y', 'z'),
  HAS_BOTTLE_0: Validator.boolean(),
  HAS_BOTTLE_1: Validator.boolean(),
  HAS_BOTTLE_2: Validator.boolean(),
  DRAG: Validator.boolean(),
  FACE: Validator.array('ceiling, wall, floor'),
  SIGNAL_FIRE: Validator.boolean(),
  WATERLOGGED: Validator.boolean(),
  BITES: Validator.number(0, 7),
  LEVEL: Validator.number(0, 15),
  TYPE: Validator.array('single', 'left', 'right', 'bottom', 'top', 'double'),
  DOWN: Validator.boolean(),
  UP: Validator.boolean(),
  NORTH: Validator.array(true, false, 'non', 'side', 'up', 'low', 'tall'),
  WEST: Validator.array(true, false, 'non', 'side', 'up', 'low', 'tall'),
  SOUTH: Validator.array(true, false, 'non', 'side', 'up', 'low', 'tall'),
  EAST: Validator.array(true, false, 'non', 'side', 'up', 'low', 'tall'),
  BOTTOM: Validator.boolean(),
  CONDITIONAL: Validator.boolean(),
  INVERTED: Validator.boolean(),
  POWER: Validator.number(0, 16),
  TRIGGERED: Validator.boolean(),
  HALF: Validator.array('lower', 'upper'),
  HINGE: Validator.array('left', 'right'),
  OPEN: Validator.boolean(),
  EYE: Validator.boolean(),
  MOISTURE: Validator.number(0, 8),
  IN_WALL: Validator.boolean(),
  SNOWY: Validator.boolean(),
  HAS_RECORD: Validator.boolean(),
  HANGING: Validator.boolean(),
  DISTANCE: Validator.number(0, 8),
  PERSISTENT: Validator.boolean(),
  HAS_BOOK: Validator.boolean(),
  EXTENDED: Validator.boolean(),
  SHORT: Validator.boolean(),
  SHAPE: Validator.array(
    'east_west',
    'north_south',
    'ascending_east',
    'ascending_west',
    'ascending_north',
    'ascending_south',
    'straight',
    'inner_left',
    'inner_right',
    'outer_left',
    'outer_right'
  ),
  MODE: Validator.array(
    'compare',
    'subtract',
    'data',
    'corner',
    'load',
    'save'
  ),
  DELAY: Validator.number(1, 5),
  LOCKED: Validator.boolean(),
  PICKLES: Validator.number(1, 5),
  LAYERS: Validator.number(1, 9),
  UNSTABLE: Validator.boolean(),
  ATTACHED: Validator.boolean(),
  DISARMED: Validator.boolean(),
  EGGS: Validator.number(1, 5),
  HATCH: Validator.number(0, 3)
};

const omitUndefinedEntries = target =>
  Object.keys(target).reduce(
    (result, key) => (target[key] ? { ...result, [key]: target[key] } : result),
    {}
  );

export default class BlockState {
  constructor(name) {
    this.name = name;
    this.variants = Object.create(null);
    this.multipart = [];
  }

  /**
   * Adds a variant to the block state configuration
   *
   * @param {string} key The variant key, typically from BLOCKSTATES
   * @param {string} model The model of the variant. Ex: block/wall_torch
   * @param {{x: Number, y: Number, uvlock: boolean, weight: Number}} options The configuration of the model
   *
   * @return {BlockState}
   */
  variant(key, model, { x, y, uvlock, weight }) {
    const variant = this.variants[key];
    const data = omitUndefinedEntries({ model, x, y, uvlock, weight });
    if (variant) {
      if (Array.isArray(variant)) {
        this.variants[key] = [...variant, data];
      } else {
        this.variants[key] = [variant, data];
      }
    } else {
      this.variants[key] = data;
    }
    return this;
  }

  multipartWhen(condition) {
    const isOr = Array.isArray(condition);
    const when = isOr
      ? { OR: condition }
      : { [condition.split('=')[0]]: condition.split('=')[1] };
  }

  multipartApply(model, { x, y, uvlock }) {
    const apply = omitUndefinedEntries({ model, x, y, uvlock });
    this.multipart.push({ apply });
  }

  static for(name) {
    const blockState = new BlockState();
    blockState.name = name;
  }
}
