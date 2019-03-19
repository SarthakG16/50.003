class MyState {
  constructor(value) {
    this._value = value;

    this._callbacks = [];
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;

    this._callbacks.forEach(
      (callback) => {
        callback();
      }
    );
  }

  registerCallback = (component) => {
    this._callbacks.push(
      () => {
        component.setState({});
      }
    );

    return this;
  }
}

export default MyState;