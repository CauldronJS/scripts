class Queue {
  constructor(data) {
    this._data = data || [];
  }

  push(record) {
    this._data.add(record);
  }

  pop() {
    return this._data.pop();
  }

  peek() {
    return this._data[0];
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
