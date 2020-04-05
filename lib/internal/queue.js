class Queue {
  constructor(data = []) {
    this._data = data;
  }

  push(record) {
    this._data.push(record);
  }

  pop() {
    return this._data.shift();
  }

  peek() {
    return this.size() > 0 ? this._data[0] : undefined;
  }

  size() {
    return this._data.length;
  }

  clear() {
    delete this._data;
    this._data = [];
  }
}

module.exports = Queue;
