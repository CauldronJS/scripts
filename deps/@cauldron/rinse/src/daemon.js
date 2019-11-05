/*
A Rinse Daemon is a component manager that operates by thread/context, size depending on
how many are operating and how many resources are available
*/

export default class Daemon {
  constructor(context) {
    this.context = context;
    this.registeredComponents = [];
  }

  mount() {
    // mount to the current context
  }

  unmount() {
    // unmount from the context
  }

  getContext() {
    return this.context;
  }
}
