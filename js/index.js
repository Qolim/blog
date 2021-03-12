/**
 * 发布订阅
 * @class EventEmitter
 */
class EventEmitter {
  constructor() {
    this.events = {}
  }

  emit(type, ...args) {
    if (this.events[type]) {
      this.events[type].map(event => {
        event.call(this, ...args)
      })
    } else {
      throw Error("event not found!")
    }
  }

  addEventListener(type, callback) {
    if (this.events[type]) {
      this.events[type] = [...this.events[type], callback]
    } else {
      this.events[type] = [callback]
    }
  }

  removeEventListener(type, callback) {
    if (this.events[type]) {
      if (callback) {
        this.events[type] = this.events[type].filter(
          event => event !== callback
        )
      } else {
        delete this.events[type]
      }
    } else {
      throw Error("event not found!")
    }
  }
}

function a() {
  console.log("a")
}

function b() {
  console.log("b")
}

const emitter = new EventEmitter();

emitter.addEventListener('a', a);
emitter.addEventListener('a', b);

emitter.removeEventListener('a', a);

emitter.emit('a')