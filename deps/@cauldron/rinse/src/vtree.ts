import { Bukkit } from 'bukkit';
import { Runnable } from 'java/lang';
import Queue from 'internal/queue';
import Component, { StateUpdateHandler } from './component';
import Rinsable, { RenderResult } from './rinsable';
import { FiberEventType, FiberEvent, FiberNode } from './fiber';

const MOST_UPDATES_PER_TICK = 64;

//@ts-ignore
const runnable = run => Java.extend(Runnable, { run });

let currentVtreeInstance: VtreeInstance = null;
const vtreeInstances = new Map<string, VtreeInstance>();

export function getCurrentVtreeInstance() {
  return currentVtreeInstance;
}

export function getVtreeByNamespace(namespace: string): VtreeInstance {
  return vtreeInstances.get(namespace);
}

type StateUpdateEvent = {
  component: Component;
  newValues: object;
  handler: (newState: object) => void;
};

/**
 * The Vtree is in charge of watching instances
 * of components registered within Rinse. This is done by iterating through
 * each namespace that is mounted
 */
export class VtreeInstance {
  taskId: number;
  namespace: string;
  fibers: Map<string, FiberNode>;
  branches: Map<Rinsable, boolean>;
  fiberUpdates: Queue;
  isReadingQueue: boolean;
  hookedStates: Map<Rinsable, object>;

  constructor(namespace: string) {
    vtreeInstances.set(namespace, this);
    this.namespace = namespace;
    this.fibers = new Map<string, FiberNode>();
    this.branches = new Map<Rinsable, boolean>();
    this.fiberUpdates = new Queue();
    this.taskId = -1;
    this.isReadingQueue = false;
    this.hookedStates = new Map<Rinsable, object>();
  }

  startWatch() {
    if (this.taskId !== -1) {
      // cancel the task
    }
    // TODO: this should be it's own separate thread with temp IDs for each function ref
    // if we have a separate thread, we can just pass messages back and forth via subscriptions
    this.taskId = Bukkit.getScheduler().scheduleSyncDelayedTask(
      $$cauldron$$,
      runnable(() => {
        if (this.isReadingQueue) return;
        for (let i = 0; i < MOST_UPDATES_PER_TICK; ++i) {
          // 64 should be fine, right?
          if (this.fiberUpdates.size() === 0) return;
          const fiberEvent = this.fiberUpdates.pop() as FiberEvent;
        }
      }),
      1
    );
  }

  private updateStateFor(stateUpdate: StateUpdateEvent) {
    const { component } = stateUpdate;
    if (!component) return; // the component was unmounted
    const oldState = { ...component.state };
    const newState = { ...oldState, ...stateUpdate.newValues };
    stateUpdate.handler(newState);
    component.componentDidUpdate(component.props, oldState);
    // mark this branch of the tree as invalid
    this.branches.set(component, false);
  }

  private updatePropsFor(component: Rinsable, newProps: object) {}

  private mountComponent(component: Rinsable, props: object) {}

  private unmountComponent(component: Rinsable) {}

  queueStateUpdate(component: Component, newValues: object): Promise<object> {
    return new Promise(resolve => {
      const stateUpdate = {
        componentId: component.__id,
        newValues,
        handler: resolve
      };
      this.fiberUpdates.push({
        type: FiberEventType.UPDATE_STATE,
        component,
        args: stateUpdate
      });
    });
  }

  registerComponent(
    component: Rinsable,
    children: RenderResult
  ): VtreeInstance {
    return this;
  }

  getStateFor(component: Rinsable) {}
}

export function beginWatchingTree(namespace: string): VtreeInstance {
  const instance = new VtreeInstance(namespace);
  currentVtreeInstance = instance;
  instance.startWatch();
  return instance;
}

export function registerComponent(component: Rinsable) {}

export function registerFunction() {}

const stateUpdateQueue = new Map<string, StateUpdateHandler>();
export function queueStateUpdate(
  component: Component,
  newValues: object
): Promise<object> {
  return new Promise((resolve, reject) => {
    Bukkit.getScheduler().scheduleSyncDelayedTask(
      $$cauldron$$,
      runnable(() => {}),
      1
    );
  });
}

export function processComponent(component: Rinsable) {}

export function shouldUpdate(id, props) {}

export function unmountComponent(component: Rinsable) {}
