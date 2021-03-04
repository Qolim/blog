/*
 * @Author: LimingQi
 * @Date: 2021-03-04 23:04:08
 * @LastEditTime: 2021-03-04 23:04:59
 * @LastEditors: LimingQi
 * @Description:postcss配置
 * @FilePath: /notes/webpack/postcss.config.js
 * Github: https://github.com/Qolim
 */
module.exports = {
  plugins: [
    //自动填充css前缀
    require('autoprefixer')
  ]
}