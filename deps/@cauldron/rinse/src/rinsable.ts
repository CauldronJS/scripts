type RinseProps = {
  children?: RenderResult;
};

export default interface Rinsable<TProps = unknown> {
  render(): RenderResult<TProps>;
}

export interface RenderResult<TProps = unknown> {
  (props?: RinseProps & TProps): Rinsable | Rinsable[] | Function | null;
}
