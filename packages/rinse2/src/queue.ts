export default class Queue<T = unknown> {
  private _data: T[];

  constructor(data = []) {
    this._data = data;
  }

  push(record: T) {
    this._data.push(record);
  }

  pop(): T {
    return this._data.shift();
  }

  peek(): T {
    return this.size() > 0 ? this._data[0] : undefined;
  }

  size(): number {
    return this._data.length;
  }

  clear(): void {
    delete this._data;
    this._data = [];
  }
}
