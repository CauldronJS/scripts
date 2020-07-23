import { Bukkit } from 'bukkit';
import { Runnable } from 'java/lang';
import Queue from 'internal/queue';
import Component, { StateUpdateHandler } from './component';
import Rinsable from './rinsable';

//@ts-ignore
const runnable = run => Java.extend(Runnable, { run });

const registeredComponents = new Map<string, Rinsable>();

/**
 * The VOL (Virtual Object Lifecycle) is in charge of watching instances
 * of components registered within Rinse. This is done by iterating through
 * each namespace that is mounted
 */
class VolInstance {
  taskId: number;
  namespace: string;
  registeredComponents: Map<string, Rinsable>;
  stateUpdateQueue: Queue;
  isReadingQueue: boolean;

  constructor(namespace: string) {
    this.namespace = namespace;
    this.registeredComponents = new Map<string, Rinsable>();
    this.stateUpdateQueue = new Queue();
    this.taskId = -1;
    this.isReadingQueue = false;
  }

  startWatch() {
    if (this.taskId !== -1) {
      // cancel the task
    }
    this.taskId = Bukkit.getScheduler().scheduleSyncDelayedTask(
      $$cauldron$$,
      runnable(() => {
        if (this.isReadingQueue) return;
      }),
      1
    );
  }

  queueStateUpdate(component: Component, newValues: object): Promise<object> {
    return new Promise((resolve, reject) => {});
  }
}

export function beginWatchingTree(namespace: string): VolInstance {
  const instance = new VolInstance(namespace);
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
