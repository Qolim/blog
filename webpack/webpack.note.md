<!--
 * @Author: LimingQi
 * @Date: 2021-03-03 21:29:14
 * @LastEditTime: 2021-03-04 00:00:07
 * @LastEditors: LimingQi
 * @Description: webpack笔记
 * @FilePath: /notes/webpack/webpack.note.md
 * Github: https://github.com/Qolim
-->


# webpack  
---

## 安装  

 npm i webpack webpack-cli -D  


## webpack.config.js  

 该文件若配置，值执行webpack命令时会自动解析该配置文件  

 基于common.js的模块化方案，使用module.exports = {} 导出配置项  


## webpack开发服务器  

 npm i webpack-dev-server -D  

 启动项@4.0以上 "dev":"webpack server" 以下 "dev":"webpack-dev-server"

 配置项 devServer  


## html-webpack-plugin  

  npm i html-webpack-plugin -D

  new HtmlWebpackPlugin()

  基于ejs模块（获取配置项参数 htmlWebpackPlugin.options）

  * template模版html文件地址
  * minify压缩html文件
  * hash是否配置hash（每次打包后的js若有改动，则会生成不同的hash值作为js文件明的一部分，实现清缓存的效果）


## clean-webpack-plugin

 npm i clean-webpack-plugin -D

 new CleanWebpackPlugin({})