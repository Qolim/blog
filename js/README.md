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
      if(curTime-preTime>time){
        fn.apply(this,args)
        preTime = curTime
      }
    }
  }
```