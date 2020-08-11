import Rinsable from './rinsable';
import { UUID } from 'java/lang';

export enum FiberEventType {
  UNMOUNT,
  MOUNT,
  UPDATE_PROPS,
  UPDATE_STATE
}

export type FiberEvent = {
  type: FiberEventType;
  node: FiberNode;
  args: any;
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
  _pendingProps: object;
  _namespace: string;
  _id: string;
  _isMarkedForDelete: boolean;

  constructor(component: Rinsable, props: object, owner?: FiberNode) {
    this._owner = owner;
    this._component = component;
    this._pendingProps = props;
    this._id = UUID.random().toString();
    this._isMarkedForDelete = false;
  }

  delete() {
    this._isMarkedForDelete = true;
    delete this._pendingProps;
  }
}
