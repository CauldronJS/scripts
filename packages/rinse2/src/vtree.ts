import Queue from './queue';
import { FiberEvent, FiberNode } from './fiber';
import {
  EffectCallback,
  FiberEventType,
  Rinsed,
  Rinsable,
  RinseProps,
  SetStateCaller,
  EffectCleanup,
} from './types';

const MOST_UPDATES_PER_TICK = 64;

let currentVtreeInstance: VirtualTree = null;
const vtreeInstances = new Map<string, VirtualTree>();

export function getCurrentVtreeInstance() {
  return currentVtreeInstance;
}

export function getVtreeByNamespace(namespace: string): VirtualTree {
  return vtreeInstances.get(namespace);
}

/**
 * The Vtree is in charge of watching instances
 * of components registered within Rinse. This is done by iterating through
 * each namespace that is mounted
 */
export class VirtualTree {
  taskId: NodeJS.Timeout;
  namespace: string;
  mountNode: FiberNode;
  fibers: Map<string, FiberNode>;
  idTree: Map<string, string[]>;
  fiberUpdates: Queue<FiberEvent>;
  effectBag: Map<string, EffectCallback[]>;
  cleanupBag: Map<string, EffectCleanup[]>;
  isReadingQueue: boolean;
  private currentComponent: string;

  constructor(namespace: string) {
    vtreeInstances.set(namespace, this);
    this.namespace = namespace;
    this.fibers = new Map<string, FiberNode>();
    this.idTree = new Map<string, string[]>();
    this.fiberUpdates = new Queue<FiberEvent>();
    this.effectBag = new Map<string, EffectCallback[]>();
    this.cleanupBag = new Map<string, EffectCleanup[]>();
    this.taskId = null;
    this.isReadingQueue = false;
  }

  mount(rinsed: Rinsed) {
    if (!rinsed) {
      throw new Error('Cannot mount undefined');
    }
    this.mountNode = this.registerComponent(rinsed.component, rinsed.props);

    console.debug(this.fibers);
  }

  startWatch() {
    // this shit don't work and idk why because console logging doesn't work
    // in a task
    if (this.taskId !== null && this.taskId.hasRef()) {
      // cancel the task
      this.taskId.unref();
    }
    // for something to be in the queue:
    // - it should have already been checked if the props change
    // - state change has to have been triggered
    this.taskId = setInterval(() => {
      if (this.isReadingQueue) return;
      this.isReadingQueue = true;
      const mountedComponents = [];
      for (let i = 0; i < MOST_UPDATES_PER_TICK; ++i) {
        // 64 should be fine, right?
        if (this.fiberUpdates.size() === 0) return;
        const fiberEvent = this.fiberUpdates.pop();
        this.currentComponent = fiberEvent.node._id;
        console.log(`Processing updates for ${fiberEvent.node._id}`);
        if (
          fiberEvent.type !== FiberEventType.UNMOUNT &&
          fiberEvent.node._isMarkedForDelete
        ) {
          fiberEvent.type = FiberEventType.UNMOUNT;
        }
        switch (fiberEvent.type) {
          case FiberEventType.MOUNT:
            // call the component with the given props, clear the pending props,
            // and then let the queue known that it's ready to run said effects
            // TODO: process component here vvvvvvvvv
            const { node } = fiberEvent;
            // the check on props is to ensure that components with null for props
            // also get remounted
            if (node._props && node._props === node._pendingProps) {
              continue;
            }
            // add the node to the appropriate trees
            this.fibers.set(node._id, node);
            if (node._owner) {
              this.idTree.set(node._owner._id, [
                ...(this.idTree.get(node._owner._id) || []),
                node._id,
              ]);
            }

            // execute the component
            const result = node._component(node._pendingProps);
            // cleanup the component
            node._props = node._pendingProps;
            delete node._pendingProps;
            this.fibers.set(node._id, node);

            // resolve the children and process
            if (Array.isArray(result)) {
              result.forEach((rinsed) => {
                this.registerComponent(rinsed.component, rinsed.props, node);
              });
            } else if (result) {
              this.registerComponent(result.component, result.props, node);
            } else {
              console.error(
                'The return values of a component must be either null, another component, or an array of components'
              );
            }
            // unmount old children

            // process component here ^^^^^^^^^^
            mountedComponents.push(fiberEvent.node._id);
            break;
          case FiberEventType.UNMOUNT:
            // unmount the component and queue all of its children for unmounting
            // TODO: process unmounting here vvvvvvvvv

            // process unmounting here ^^^^^^^^
            const cleanup = this.cleanupBag.get(fiberEvent.node._id);
            if (cleanup) {
              cleanup.forEach((fn) => fn());
            }
            break;
          case FiberEventType.UPDATE_STATE:
            // call all effects (?) and then check children components for prop updates
            break;
        }
      }
      // fully flush the effect queue of all items that were mounted
      mountedComponents.forEach((id: string) => {
        const effects = this.effectBag.get(id);
        effects.forEach((effect) => {
          const cleanup = effect();
          if (cleanup) {
            if (this.cleanupBag.get(id)) {
              this.cleanupBag.get(id).push(cleanup);
            } else {
              this.cleanupBag.set(id, [cleanup]);
            }
          }
        });
      });
    }, 50);
  }

  createStateChangeFn<T>(setState: SetStateCaller<T>): SetStateCaller<T> {
    // this is some black magic BUT it allows the setter in useState to inform the tree
    // of a state update. Ideally I'd like to collect all state changes at once but that's
    // probably not gonna happen and might result in components being remounted like crazy
    // like in React
    var id = this.currentComponent;
    return (value: T) => {
      setState(value);
      this.fiberUpdates.push({
        node: this.fibers.get(id),
        type: FiberEventType.UPDATE_STATE,
      });
    };
  }

  queueEffect(effect: EffectCallback) {
    const component = this.currentComponent;
    if (this.effectBag.has(component)) {
      this.effectBag.get(component).push(effect);
    } else {
      this.effectBag.set(component, [effect]);
    }
  }

  private registerComponent(
    component: Rinsable,
    props: RinseProps,
    owner?: FiberNode
  ): FiberNode {
    const node = new FiberNode(component, props, owner);
    const event = {
      type: FiberEventType.MOUNT,
      node,
      args: props,
    };
    this.fiberUpdates.push(event);
    return node;
  }
}

export function registerComponent(component: Rinsable) {}

export function registerFunction() {}
