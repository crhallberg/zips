export default class KDTree {
  root = null;
  VALUE = 0;
  LEFT = 1;
  RIGHT = 2;

  #leaf(item) {
    return [item];
  }

  constructor(...axes) {
    this.axes = axes ?? ["x", "y"];
    this.k = this.axes.length;
  }

  clear() {
    this.root = null;
  }

  /**
   * spiral order
   * @return {Array}
   */
  toArray() {
    let arr = [];
    let queue = [this.root];

    while (queue.length > 0) {
      const curr = queue.shift();
      arr.push(curr[this.VALUE]);

      if (curr[this.LEFT] ?? false) {
        queue.push(curr[this.LEFT]);
      }

      if (curr[this.RIGHT] ?? false) {
        queue.push(curr[this.RIGHT]);
      }
    }

    return arr;
  }

  /**
   * @return {string}
   */
  export() {
    return JSON.stringify({ axes: this.axes, root: this.root });
  }

  /**
   * @param json {string}
   */
  import(json) {
    const data = typeof json == "string"
      ? JSON.parse(json)
      : json;

    this.axes = data.axes;
    this.root = data.root;

    this.k = this.axes.length;
  }

  #insertImpl(item, current, depth) {
    const axis = this.axes[depth % this.k];

    const dir = item[axis] < current[this.VALUE][axis]
      ? this.LEFT
      : this.RIGHT;

    const next = current[dir] ?? null;
    if (next === null) {
      current[dir] = this.#leaf(item);
      return;
    }

    this.#insertImpl(item, next, depth + 1);
  }

  insert(item) {
    if (this.root === null) {
      this.root = this.#leaf(item);
      return;
    }

    this.#insertImpl(item, this.root, 0);
  }

  #searchImpl(point, current, depth) {
    const k = depth % this.k;
    const axis = this.axes[k];

    const dir = point[k] < current[this.VALUE][axis]
      ? this.LEFT
      : this.RIGHT;

    const next = current[dir] ?? null;
    if (next === null) {
      return current[this.VALUE];
    }

    return this.#searchImpl(point, next, depth + 1);
  }

  search(...point) {
    return this.#searchImpl(point, this.root, 0);
  }
}
