/*
 * @Author: LimingQi
 * @Date: 2021-03-03 21:39:16
 * @LastEditTime: 2021-03-04 01:17:03
 * @LastEditors: LimingQi
 * @Description: webpack配置
 * @FilePath: /notes/webpack/webpack.config.js
 * Github: https://github.com/Qolim
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

  // 入口文件 字符串 数组 对象
  // entry: "./src/index.js",
  // entry: ["./src/index.js"],
  entry: {
    index: "./src/index.js"
  },

  // 打包文件配置
  output: {
    //文件名 (若需要多个打包文件 [name] name呆滞entry对象的key)
    filename: "[name].[hash:8].js",
    //打包地址
    path: path.resolve('./build')
  },

  //开发服务器配置
  devServer: {
    //端口
    port: 3001,
    //服务器入口目录 （一般即打包文件夹）
    contentBase: "./build",
    //是否进行服务器压缩
    compress: true,
    //是否自动打开浏览器
    open: true
  },

  //模块配置 （loader）
  module: {

  },

  //插件配置
  plugins: [

    //清除文件配置（在重新打包生成html文件之前删除build文件夹）
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['./build']
    }),

    //html文件配置
    new HtmlWebpackPlugin({
      //html模版地址
      template: "./src/index.html",
      //js标签在html的位置
      inject: "body",
      //标题
      title: "webpack测试",
      //是否配置hash
      hash: true,
      //引用的js文件 entry对象的key（若是多入口 多出口文件才需要，需要多个html则配置多个html-webpack-plugin插件）
      chunks: ['index'],
      //压缩
      minify: {
        //压缩为一行
        collapseWhitespace: true,
        //移除属性双引号
        removeAttributeQuotes: true
      },
    })

  ],

  //打包模式
  mode: "development",

  //配置解析
  resolve: {}

}