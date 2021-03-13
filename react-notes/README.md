

# REACT核心面试

## react中的key的作用

* 标识唯一性（配合type）

> 在diff算法过程中判断元素是否可以复用
> 如果key和type类型都相同，则表明是同一个元素，直接复用该元素，不用再重新创建

* 将fiber链表生成为一个[key,fiber]的map图

> 便于获取节点

* 不建议用index作为key（额外消耗性能）

> 如果用index作为key，对节点进行删除操作时，index会发生改变，那么会导致diff算法重新生成节点，不能复用之前的节点


## ref

* 什么是ref

> ref是react提供的访问dom的方式

* React.createRef() 

* 可以指定给jsx的dom、也可以指定给class组件可以获取到class组件的实例

* function组件不能直接绑定ref，需要通过 React.forwardRef((props,ref)=>FnComponnet) 函数来转发ref

* 可以用内连函数的方式绑定ref -> ref = {el=>ref.current} 

> 内连函数的方式会导致函数重复执行，在每次render的时候都会重新生成一个新的函数，浪费性能

* const ref = useRef()  


## 生命周期

* constructor() 构造函数（调用一次）

> 组件挂载之前执行
> 为state初始化值 或者绑定事件函数的的this 
> 若要在构造函数中访问this.props 需要先执行super(props)
> 初始化state直接用this.state = ... ，不能在构造函数中使用this.setState()

* componentDidMount() 组件挂载完成 （调用一次）

> 执行副作用

* shouldComponentUpdate(nextProps, nextState) 是否更新组件 （渲染执行之前被调用，首次渲染不会调用）

> 性能优化

* componentDidUpdate(preProps,preState,snapshot) 组件跟新完成 （每次更新都会调用，首次渲染不会调用）

> 进行props，state比较

* componentWillMount() 组件将要卸载 （调用一次）

> 清除副作用

* static getDerivedStateFromProps(props, state) render方法之前被调用（每次都会被调用）

> 它应返回一个对象来更新 state，如果返回 null 则不更新任何内容，用于需要通过props设定state的情况下

* getSnapshotBeforeUpdate(prevProps, prevState)

> 在最近一次渲染输出（提交到 DOM 节点）之前调用

> 组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）

> 此生命周期的返回值将作为参数传递给 componentDidUpdate()


## 事件系统

* 合成事件机制

> react针对不同浏览器的事件差异性自己做了一套兼容的事件系统

* 事件代理

> react中所有事件都被代理到顶层节点，由顶层节点统一处理，节省性能

* 事件映射表

> react用于记录所有合成事件，便于判断是否是合成事件


## setState

* 同步异步问题

> 合成事件异步执行

> 原生事件同步执行

> 生命周期函数中是异步执行

> setTimeout（异步任务）下是同步执行

* 批量更新

> 在合成事件和生命周期函数中react会对setState创建一个更新队列，最终提交时会对更新进行合并

> 原生事件和setTimeout（异步任务）中因为是同步更新的，所以不会覆盖setState的执行

## setState总结 

* setState只在合成事件和生命周期函数中是“异步”的，在原生事件和 setTimeout（异步任务） 中都是同步的。

* setState的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。

* setState的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout（异步任务） 中不会批量更新，在“异步”中如果对同一个值进行多次setState ，setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。

## context

* Provider value赋值最好不要直接使用对象赋值，改为使用state中的状态来管理

> 因为父组件如果有更新，value直接使用对象赋值的话会导致生成一个新对象，那么子组件也会更新

## React性能优化

* 类组件

> 使用PureComponent（会对props进行浅比较，决定组件是否渲染）

> 使用shouldComponentUpdate生命周期判断组件是否需要更新

* 函数组件

> 使用React.memo() 同PureComponent

> 使用useMemo useCallback 缓存参数和函数

* map渲染组件时使用唯一key值而不要用index

* 减少使用内联函数（直接卸载jsx中的函数）

* context的value值使用组件中state而不要直接赋值对象

* Router中渲染组件使用render或者children 不要使用component（同样是会导致重复渲染）

* 对代码进行分割React.lazy()懒加载

* webpack配置代码压缩、图片资源压缩、按需加载

* 高频事件根据业务进行防抖节流

