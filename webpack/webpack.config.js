/*
 * @Author: LimingQi
 * @Date: 2021-03-03 21:39:16
 * @LastEditTime: 2021-03-05 00:43:40
 * @LastEditors: LimingQi
 * @Description: webpack配置
 * @FilePath: /notes/webpack/webpack.config.js
 * Github: https://github.com/Qolim
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
    path: path.resolve(__dirname, 'build')
  },

  //开发服务器配置
  devServer: {
    //端口
    port: 3001,
    //服务器入口目录 （一般即打包文件夹）
    contentBase: path.resolve(__dirname, 'build'),
    //是否进行服务器压缩
    compress: true,
    //是否自动打开浏览器
    open: true,
    //是否热跟新
    hot: true
  },

  //模块配置 （loader）
  module: {
    rules: [
      //css配置
      {
        test: /\.css$/,
        use: [
          // {
          //   loader: "style-loader"
          // },
          //配置css分离
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader"
          },
          // 配置css前缀
          {
            loader: "postcss-loader"
          },
        ]
      },
      //less配置
      {
        test: /\.less$/,
        use: [
          // {
          //   loader: "style-loader"
          // },
          //配置css分离
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader"
          },
          // 配置css前缀
          {
            loader: "postcss-loader"
          },
          //配置less-loader
          {
            loader: "less-loader"
          }
        ]
      },
      //url-loader
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 小于10KB图片，转base64编码
          limit: 10,
        }
      },
      //文件loader
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              pngquant: {
                // 设置品质区间
                quality: [0.65, 0.90]
              },
            }
          },
        ],
      }
    ]
  },

  //插件配置
  plugins: [

    //清除文件配置（在重新打包生成html文件之前删除build文件夹）
    new CleanWebpackPlugin.CleanWebpackPlugin(),

    //文件拷贝
    new CopyWebpackPlugin({
      patternqs: [
        { from: path.resolve(__dirname, 'src/public'), to: path.resolve(__dirname, "build/public") },
      ],
    }),

    //html文件配置
    new HtmlWebpackPlugin({
      //html模版地址
      template: "./src/index.html",
      //js标签在html的位置
      inject: "body",
      //标题
      title: "react-cli",
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
    }),

    //分离css文件
    new MiniCssExtractPlugin({ filename: "[name].css" }),

  ],

  //代码压缩
  optimization: {
    minimize: true,
    minimizer: [
      //css压缩
      new CssMinimizerPlugin()
    ]
  }

}