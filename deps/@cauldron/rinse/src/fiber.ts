import Rinsable from './rinsable';

export enum FiberEventType {
  UNMOUNT,
  MOUNT,
  UPDATE_PROPS,
  UPDATE_STATE
}

export type FiberEvent = {
  type: FiberEventType;
  component: Rinsable;
  args: any;
};
