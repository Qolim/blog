# JS常见面试知识点

## 防抖节流

* 防抖 -> 使得高频事件延迟执行，并且延迟执行时间段内重新触发了事件则重置延迟时间

```javascript

  function debounce (fn,time) {
    let timer = undefind
    return function(...args){
      /** 每次执行清除上一个定时器并重新生成一个定时器 */
      clearTimeout(timer)
      timer = setTimeout(()=>{
        fn.apply(this,args)
      },time)
    }
  }

```

* 节流 -> 高频事件在设定时间内只执行一次

```javascript
  function throttle (fn,time) {
    let preTime = 0
    return function(...args){
      let curTime = new Date().getValue()
      /** 只有在超过了设定时间触发事件才会被执行 */
      if(curTime-preTime>time){
        fn.apply(this,args)
        preTime = curTime
      }
    }
  }
```

## Object.defineProperty

> 在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象

```javascript

  const a = { a:"a" }

  Object.defineProperty(
    /** 操作的对象 */
    a,
    /** 操作的对象属性 */
    "b",
    /** 属性描述对象 所有属性默认都为false */
    {
      /** 属性值 */
      value:"b",
      /** 是否可编辑 */
      writable:boolean,
      /** 是否可遍历 */
      enumerable:boolean,
      /** 对象的属性是否可以被删除，以及除 value 和 writable 特性外的其他特性是否可以被修改 */
      configurable:boolean,
      /** 访问属性时会调用该方法 得到该方法的返回值 */
      get(){

      },
      /** 设置属性时会调用该方法，属性值更具该方法改变 */
      set(){
        
      }
    }
  )

```

> 如果一个描述符同时拥有 value 或 writable 和 get 或 set 键，则会产生一个异常

## 事件循环机制 EventLoop

* js是单线程执行，但是执行时可以有多个任务队列

* js代码的执行是在函数调用栈中执行的，遵循先进先出原则

* js的任务队列类型分为宏任务（mac-task）和微任务（mic-task）

* 宏任务主要包含script（整体代码）、setTimeout、setInterval、I/O（与系统交互）、UI rendering（页面渲染）

* 微任务主要是promise

* 事件循环机制是每一次循环先将所有的宏任务队列一次放入函数调用栈中执行，执行完执行在将微任务队列依次放入函数调用栈中执行

* 第一次执行的宏任务是script整体代码，执行过程中会将生成的任务依次放入格子的任务队列

* 第一次宏任务（script代码）执行完之后执行之前生成的微任务队列

* 任务执行先以队列优先、再以队列中的任务先后顺序优先

* setTimeout和setInterval会共用一个任务队列

* promise中的代码会立即执行不属于微任务，只有.then和.catch或.finally中的代码才属于微任务

* 代码执行过程中先提交一个setTimeout到下一次宏任务队列，再提交一个I/O任务到队列，接着再执行一个setTimeout的话，最后一个setTimeout会提交到第一个setTimeout所在的队列中（会比I/O任务先执行）

* 在setTimeout任务中在执行setTimeout则后面的setTimeout会被提交到下一次宏任务的setTimeout队列中

## new的过程

* 首先创建一个空对象（实力对象）

* 将实例对象的__proto__指向构造函数的prototype，实现原型属性的继承

* 将实例对象作为this传递给构造函数并调用，初始化属性赋值，实现属性继承

## class extends 继承原理

> B extends A 的执行过程

* B.prototype.__proto__ =A.prototype

* B.__proto__ =A (B由A构造而来)

* 最后需要继承构造函数里的属性和方法（通过apply(this, arguments)）

## constructor 中的 super()

> 在子类constructor中，super等同于父类的constructor.bind(this)

> 在子类成员函数中super则解析为一个object

## 发布订阅模式

```typescript

class EventEmitter {

  private events: {
    [name: string]: ((...args:any[])=>any)[]
  }

  constructor() {
    this.events = {}
  }

  emit(type: string, ...args: any[]) {
    if (this.events[type]) {
      this.events[type].forEach(event => event.apply(this, args))
      return
    } throw Error("event not found !")
  }

  addEventListener(type: string, callback: (...args:any[])=>any) {
    this.events[type] =
      this.events[type]
        ? [...this.events[type], callback]
        : [callback]
  }

  removeEventListener(type: string, callback: (...args:any[])=>any) {
    if (this.events[type]) {
      if (callback) {
        this.events[type] = this.events[type].filter(event => event !== callback)
      } else {
        this.events[type] = null
      }
      return
    }
    throw Error("event not found!")
  }

}
```

## 箭头函数和普通函数的区别

1. 箭头函数中的this指向的是创建时外层函数执行上下文中的this，箭头函数的this是不会改变的，也无法通过apply、call和bind来改变this指向
3. 箭头函数没有自己的arguments，在箭头函数中使用argumens会去外层函数的执行上下文中取。
2. 箭头函数不能用作构造函数
4. 箭头函数没有prototype属性

## 手写一个深拷贝（解决循环依赖等问题）
```javascript
  
  /** 深拷贝 */
  function deepCopy(target) {

    /** 此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象 */
    let copyed_objs = [];

    function _deepCopy(target) {

      /** 非对象直接返回 */
      if ((typeof target !== 'object') || !target)
        return target;

      /** 如果在copyed_objs中找到了target，直接返回找到的target */
      let copyd_objs_index = copyed_objs.findIndex(item => item.target === target)
      if (copyd_objs_index !== -1)
        return copyed_objs[copyd_objs_index].copyTarget

      /** 拷贝对象 */
      let obj = {};
      /** 如果是数组则赋值为数组 */
      if (Array.isArray(target))
        obj = [];

      /** 将当前对象和当前对象的拷贝对象放进copyed_objs中 */
      copyed_objs.push({ target, copyTarget: obj })

      /** 遍历当前对象的所有key值，依次对其进行拷贝 */
      Object.keys(target).forEach(key => {
        obj[key] = _deepCopy(target[key]);
      });
      return obj;

    }

    return _deepCopy(target);
  }
  
```

## async await 实现原理
async await 是基于generator函数封装的 相当于一个自带执行器的generator函数
generator函数返回一个迭代器对象，需要一个执行器对这个迭代器对象进行执行(next())方法

## 迭代器对象

* 包含一个名为[Symbol.iterator]的方法，该方法必须返回一个带有next方法的对象
* next方法需要返回一个对象，包含value的done两个属性，value表示下一次执行返回的值，done表示是否执行完成

```javascript
  const obj = {
    from: 1,
    to: 5,
    [Symbol.iterator]() {
      let { from, to } = this
      return {
        next() {
          from++
          return from > to + 1 ? {
            done: true
          } : {
            done: false,
            value: from - 1
          }
        }
      }
    }
  }
  for (let a of obj) {
    console.log(a)
  }
```