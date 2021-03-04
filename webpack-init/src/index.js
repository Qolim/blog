/*
 * @Author: LimingQi
 * @Date: 2021-03-05 03:54:06
 * @LastEditTime: 2021-03-05 05:49:06
 * @LastEditors: LimingQi
 * @Description:入口js文件
 * @FilePath: /webpack-init/src/index.js
 * Github: https://github.com/Qolim
 */
import './a/index';
import './index.css';
import './index.less';

console.log("hello webpack with hot !")


/** 不刷新页面实现热更新 */
module?.hot
  && module?.hot?.accept()