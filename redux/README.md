# readux react-readux

## <Provider store={store} />

> 通过 react-redux的提供的Provider全局注入store

## store = createStore(reducers,initStore，applyMiddleware)

> createStore 接受reducers和中间件作为参数

> 多个reducer可以通过combineReducers组合在一起

> 子组件通过connect方法关联soter

> connect是一个高阶函数接受两个函数作为参数，第一个函数取store中的值传递给子组件，第二个函数将dispatch方法传递给子组件

> react-redux中异步处理需用用到中间件thunk-redux

## thunk-redux

> thunk-redux可以将action变为一个函数传入

> thunk-redux会判断传入的action是否是一个函数，如果是则会执行该函数并传入dispath和getState方法，则可以在函数中执行异步操作后通过dispatch更新store，如果不是函数则直接执行dispatch(action)

## applyMiddleware 源码理解（中间件的核心作用就是对redux的dispatch方法进行改造）

```javascript
function applyMiddleware() {

  /** 处理参数（接受中间件函数） */
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

/** 返回一个函数 接受createStore作为参数 */
  return function (createStore) {

    return function () {

      /** 创建一个新的store */
      var store = createStore.apply(void 0, arguments);

      /** 占位用的dispatch方法 */
      var _dispatch = function dispatch() {
        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      /** 传递给中间件的参数 */
      var middlewareAPI = {
        /** store上的原生getState方法 */
        getState: store.getState,
        /** 
         * 非常重要的一段代码
         * 传递给中间件的dispatch方法 是一个函数 返回之间创建的dispatch函数的执行 
         * 这里形成了一个闭包 这个dispatch函数是对外部创建的占位用的dispatch函数的引用 
         * */
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      

      /** 
       * 对中间件进行遍历执行 
       * 传入上面定义的参数 
       * 拿到执行后的中间件列表
       * 注意这里传入的dispatch是占位dispatch 
       * */
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });

      /** 
       * 对中间件的执行结果进行合并的，
       * 传入初始的原生dispatch 
       * 并将最终生成的新的dispatch赋值给之前占位用的dispatch
       * 因为在之前传入中间件的dispatch是一个闭包函数对占位diaptch的引用
       * 所以这里对占位dispatch重新赋值 会更新传入中间件的dispatch方法
       * */
      _dispatch = compose.apply(void 0, chain)(store.dispatch);

      /**
       * 最终返回一个更新过dispatch方法的store
       * */
      return _objectSpread2({}, store, {
        dispatch: _dispatch
      });
    };
  };
}
```

## redux-thunk源码分析 

 thunk其实就是对传入dispatch的action做了改造使其可以是一个函数，
 然后将redux通过中间件改造后的dispatch方法和getState方法传入作为函数的action，并执行
 如此变可以在action中执行异步任务，然后通过dispatch更新数据

 ```javascript
    /** 
     * 中间件函数，接受redux传递过来的getState和dispatch
     * 这个dispatch在redux-applyMiddleware函数内部一开始是一个占位用dispatch，
     * 等所中间件执行完之后会变成中间件改造后的dispatch
     *  如果执行thunk一个中间件，也就是thunk函数内部返回的第二层函数
     * */
    function thunk({getState,dispatch}){
      /**
       * 第一层函数执行完之后第二层函数会在applyMiddleware中的compose函数中依次执行
       * next就是上一个中间件改造后的dispatch方法（第一个中间件接受的是初始store提供的dispatch）
       **/
      return function(next){
        /**
         * 第三层函数是最终传递给下一个中间件的dispatch方法（若没有下一个中间件则直接是用户使用dispatch）
         * 判断用户传入的action是否是函数，如果是则执行action并传入dispatch（
         * 如果后面没有中间件了，那么这个dispatch其实就是这个函数自身
         * ）和getState
         **/
        return function(action){
          if(typeof action === "function"){
            action(dispatch,getState)
          }else{
            next(action)
          }
        }
      }
    }

 ```
