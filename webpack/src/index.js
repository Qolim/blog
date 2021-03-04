/*
 * @Author: LimingQi
 * @Date: 2021-03-03 21:42:25
 * @LastEditTime: 2021-03-04 23:46:28
 * @LastEditors: LimingQi
 * @Description:入口js
 * @FilePath: /notes/webpack/src/index.js
 * Github: https://github.com/Qolim
 */

import { render } from 'react-dom';
import App from './App.jsx';

render(
  <App />, document.getElementById("root")
)


/** 热更新 */
if (module.hot) {
  module.hot.accept();
}

