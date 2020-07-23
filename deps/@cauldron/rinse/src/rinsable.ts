export default interface Rinsable {
  render(): RenderResult;
}

export interface RenderResult {
  (props?: object): Rinsable | Rinsable[] | Function | null;
}
