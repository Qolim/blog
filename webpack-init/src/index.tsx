/*
 * @Author: LimingQi
 * @Date: 2021-03-05 03:54:06
 * @LastEditTime: 2021-03-05 08:47:45
 * @LastEditors: LimingQi
 * @Description:入口js文件
 * @FilePath: /webpack-init/src/index.tsx
 * Github: https://github.com/Qolim
 */
import React from "react";
import { App } from './App';
import ReactDom from 'react-dom';
import './index.css';
import './index.less';

ReactDom.render(
  <App />,
  document.getElementById("root")
);

/** 不刷新页面实现热更新 */
(module as any)?.hot
  && (module as any)?.hot?.accept()