<!--
 * @Author: LimingQi
 * @Date: 2021-03-11 08:41:32
 * @LastEditTime: 2021-03-11 08:48:21
 * @LastEditors: LimingQi
 * @Description: 
 * @FilePath: /notes/react-notes/README.md
 * Github: https://github.com/Qolim
-->

# REACT核心面试
___

## react中的key的作用

* 标识唯一性

> 在diff算法过程中判断元素是否可以复用
> 如果key和type类型都相同，则表明是同一个元素，直接复用该元素，不用再重新创建

* 生成一个[key.,fiber]的map图

> 便于获取节点