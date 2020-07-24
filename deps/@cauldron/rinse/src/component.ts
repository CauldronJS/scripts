import { getCurrentVolInstance, getVolByNamespace } from './vol';
import RinseProps from './props';
import Rinsable, { RenderResult } from './rinsable';
import objectHash from 'object-hash';

export default class Component implements Rinsable {
  props: object & RinseProps;
  state: {};
  __id: string;
  __namespace: string;

  constructor(props: object & RinseProps) {
    this.props = props;
    this.state = {};
    this.__id = objectHash(props);
    // register this component to the VOL
    this.__namespace = getCurrentVolInstance().registerComponent(
      this,
      props.children
    ).namespace;
  }

  setState(
    newValues: any,
    onUpdate?: (oldState: object, newState: object) => void
  ) {
    const oldState = { ...this.state };
    getVolByNamespace(this.__namespace)
      .queueStateUpdate(this, newValues)
      .then((newState: object) => {
        this.state = newState;
        if (onUpdate) {
          onUpdate(oldState, newState);
        }
      });
  }

  componentDidMount() {}
  componentDidUnmount() {}
  componentDidCatch() {}
  componentDidUpdate(oldProps, oldState) {}

  render(): RenderResult {
    throw new Error(
      'Component must have a render function that returns null, a string, or function'
    );
  }
}

export interface StateUpdateHandler {
  (component: Component): boolean;
}
