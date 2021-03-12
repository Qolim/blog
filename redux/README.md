# readux react-readux

## <Provider store={store} />

> 通过 react-redux的提供的Provider全局注入store

## store = createStore(reducers,applyMiddleware)

> createStore 接受reducers和中间件作为参数

> 多个reducer可以通过combineReducers组合在一起

> 子组件通过connect方法关联soter

> connect是一个高阶函数接受两个函数作为参数，第一个函数取store中的值传递给子组件，第二个函数将dispatch方法传递给子组件

> react-redux中异步处理需用用到中间件thunk-redux

## thunk-redux

> thunk-redux可以将action变为一个函数传入

> thunk-redux会判断传入的action是否是一个函数，如果是则会执行该函数并传入dispath和getState方法，则可以在函数中执行异步操作后通过dispatch更新store，如果不是函数则直接执行dispatch(action)
