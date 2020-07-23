import Rinsable, { RenderResult } from './rinsable';
import RinseProps from './props';

export default class FCComponent implements Rinsable {
  fn: RenderResult;
  props: object & RinseProps;

  constructor(fn: RenderResult, props: object & RinseProps) {
    this.fn = fn;
    this.props = props;
  }

  render(): RenderResult {
    return this.fn(this.props) as RenderResult;
  }
}
