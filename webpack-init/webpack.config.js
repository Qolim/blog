/*
 * @Author: LimingQi
 * @Date: 2021-03-05 03:52:00
 * @LastEditTime: 2021-03-05 08:49:39
 * @LastEditors: LimingQi
 * @Description:webpack配置文件
 * @FilePath: /webpack-init/webpack.config.js
 * Github: https://github.com/Qolim
 */
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.tsx" //入口文件index 可配置多个
  },
  // entry: "./src/index.tsx",
  devtool: 'inline-source-map',
  output: {
    filename: "index.[hash:16].js", //出口文件 [name]对映入口文件的key [hash]计算文件唯一性
    path: path.resolve(__dirname, "dist") //打包到文件地址
  },
  devServer: { //开发服务器配置 依赖包webpack-dev-server
    port: 3021, //本地开发服务器端口号
    contentBase: path.resolve(__dirname, "dist"), //服务器静态资源路径
    hot: true,//是否热更新 入口js文件配合module.hot.accept()使用
    open: true,//是否自动打开浏览器
    compress: true,//是否精简服务器资源
  },
  plugins: [
    new CleanWebpackPlugin.CleanWebpackPlugin(),//打包前清除原打包文件 依赖包clean-webpack-plugin
    new CopyWebpackPlugin({ patterns: [{ from: path.resolve(__dirname, "src/public"), to: path.resolve(__dirname, "dist/public") }] }),//资源文件拷贝插件 依赖包copy-webpack-plugin
    new MiniCssExtractPlugin({ filename: "index.css" }),//分离css文件 依赖包mini-css-extract-plugin
    new HtmlWebpackPlugin({//html打包插件 依赖包html-webpack-plugin
      template: path.resolve(__dirname, "src/index.html"),//模版html
      title: "webpack@5.0基础配置",//html标题
      inject: "body",//script标签插入位置
      hash: true,//引入js是否附带hash清除缓存
      chunks: "['index']",//引入的js文件 对映入口文件的key
      minify: {//html文件压缩
        collapseWhitespace: true,//空格合并
        removeAttributeQuotes: true,//移除属性引号
      }
    })
  ],
  module: {
    rules: [//loader
      {
        test: /\.css$/,
        use: [
          // { loader: "style-loader" },//依赖style-loader
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },//依赖包css-loader
        ]
      },
      {
        test: /\.less$/,
        use: [
          // { loader: "style-loader" },
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          { loader: "less-loader" },//依赖包less-loader
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",//图片引入loader 依赖包url-loader file-loader
            options: {
              limit: 10,//图片转为base64限制大小 单位K，超过不转换为base64
              name: "[name].[ext]",//使用文件本省的文件名和后缀
              outputPath: "public",//资源输出目录
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader",//babel-loader babel配置见.babelrc 依赖包  babel-loader @babel/core @babel/preset-env
          }
        ],
        exclude: /node_modules/,//排除文件
      },
      {
        test: /\.tsx?$/,
        use: [
          { loader: "ts-loader" } //ts-loader ts配置见tsconfig.json 依赖typescript ts-loader
        ],
        exclude: /node_modules/,//排除文件
      }
    ]
  },
  optimization: {//代码压缩
    minimize: true,//是否压缩代码
    minimizer: [
      new CssMinimizerWebpackPlugin()//css代码压缩
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

}