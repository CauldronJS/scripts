import { FiberEventType, Rinsable, RinseProps } from './types';
import { UUID } from 'java/util';

export type FiberEvent = {
  type: FiberEventType;
  node: FiberNode;
};

/**
 * Keeps track of the component, providing a context when updating it
 *
 * Note: before each component is called, be sure to appropriately
 * enter this node's context so that all state and effect calls are
 * properly bound to it. After the return statement but before the next
 * rendering, clean and leave the context of the vtree.
 */
export class FiberNode {
  /**
   * The parent FiberNode for this component
   *
   * @type {FiberNode}
   * @memberof FiberNode
   */
  _owner: FiberNode;
  _component: Rinsable;
  /**
   * Represents the props object that should be applied next update.
   * While this object is null, this means the component should not
   * be updated
   *
   * @type {object}
   * @memberof FiberNode
   */
  _pendingProps: RinseProps;
  /**
   * Represents the props object passed into the component
   *
   * @type {RinseProps}
   * @memberof FiberNode
   */
  _props: RinseProps;
  _namespace: string;
  /**
   * The ID of the node. These will never change for as long as the
   * component is alive (stayed mounted, prop changes not included)
   *
   * @type {string}
   * @memberof FiberNode
   */
  _id: string;
  _isMarkedForDelete: boolean;
  _isMounted: boolean;

  constructor(component: Rinsable, props: RinseProps, owner?: FiberNode) {
    this._owner = owner;
    this._component = component;
    this._pendingProps = props;
    this._id = UUID.randomUUID().toString();
    this._isMarkedForDelete = false;
    this._isMounted = false;
  }

  delete() {
    this._isMarkedForDelete = true;
    delete this._pendingProps;
  }
}
