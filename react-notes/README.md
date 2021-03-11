

# REACT核心面试

## react中的key的作用

* 标识唯一性（配合type）

> 在diff算法过程中判断元素是否可以复用
> 如果key和type类型都相同，则表明是同一个元素，直接复用该元素，不用再重新创建

* 将fiber链表生成为一个[key,fiber]的map图

> 便于获取节点

* 不建议用index作为key（额外消耗性能）

> 如果用index作为key，对节点进行删除操作是，index会发生改变，那么会导致diff算法重新生成节点，不能复用之前的节点


## ref

* 什么是ref

> ref是react提供的访问dom的方式

* React.createRef() 

* 可以指定给jsx的dom、也可以指定给class组件可以获取到class组件的实例

* function组件不能直接绑定ref，需要通过 React.forwardRef((props,ref)=>FnComponnet) 高阶组件来转发ref

* 可以用内连函数的方式绑定ref -> ref = {el=>ref.current} 内连函数的方式会导致函数重复执行

> 内连函数的方式在每次render的时候都会重新生成一个新的函数，会导致重复执行

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

> 它应返回一个对象来更新 state，如果返回 null 则不更新任何内容

* getSnapshotBeforeUpdate(prevProps, prevState)

> 在最近一次渲染输出（提交到 DOM 节点）之前调用

> 组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）

> 此生命周期的任何返回值将作为参数传递给 componentDidUpdate()


## 事件系统

* 合成事件机制

> react针对不同浏览器的事件差异性自己做了一套兼容的事件系统

* 事件代理

> react中所有事件都被代理到顶层节点，由顶层节点统一处理
> diff算法的时候可以过滤事件系统，节省性能

* 事件映射表

> 
