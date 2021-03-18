# typescript

## interface 和 type 的区别

1. type可以用与申明基础类型联合类型和交叉类型以及枚举类型 interface 不能
2. interface可以使用extends来继承类型 type只能使用交叉类型来实现继承
3. interface会对多个相同的类型变量进行合并 type不能声明多个相同的类型变量
4. type可以直接使用typeof来获取变量的类型 interface无法直接使用typeof获取某个变量的类型，但是可以在接口的某一个属性使用typeof