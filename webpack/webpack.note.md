<!--
 * @Author: LimingQi
 * @Date: 2021-03-03 21:29:14
 * @LastEditTime: 2021-03-05 00:42:10
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


## html-webpack-plugin html文件打包

  npm i html-webpack-plugin -D

  new HtmlWebpackPlugin()

  基于ejs模块（获取配置项参数 htmlWebpackPlugin.options）

  * template模版html文件地址
  * minify压缩html文件
  * hash是否配置hash（每次打包后的js若有改动，则会生成不同的hash值作为js文件明的一部分，实现清缓存的效果）


## clean-webpack-plugin 打包时清除原打包文件

 npm i clean-webpack-plugin -D

 new CleanWebpackPlugin({})


## style-loader css-loader less-loader css相关loader

 module:{
   rules:[
     {
       test:"/\.less$/",
       use:[{loader:"style-loader"},{loader:"css-loader"},{loader:"less-loader"}]
     }
   ]
 }


## mini-css-extract-plugin 分离css相关文件

 npm i mini-css-extract-plugin -D

 const  MiniCssExtractPlugin = require("mini-css-extract-plugin")

 new MiniCssExtractPlugin({filename:"[name].css"})

 module:{
   rules:[
     {
       test:"/\.css$/",
       use:[
         MiniCssExtractPlugin.loader,
         {loader:"css-loader"}
       ]
     }
   ]
 }


## postcss-loader autoprefixer 配置css前缀

 npm i postcss-loader autoprefixer -D

 module:{
   rules:[
     {
       test:"/\.css$/",
       use:[
         {loader:"css-loader"},
         {loader:"postcss-loader"}
       ]
     }
   ]
 }

 新增 postcss.config.js 文件
 
 module.exports={
   plugins:[require('autoprefixer')]
 }


## css-minimizer-webpack-plugin css文件压缩

 npm i css-minimizer-webpack-plugin -D

 optimization: {
    minimizer: [
     new CssMinimizerPlugin()
    ]
}

## url-loader file-loader image-webpack-loader 资源loader

 npm i url-loader file-loader image-webpack-loader -D

 module:{
   rules:[
     {
       test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
       use:[
         {
           loader:"url-loader",
           options:{
             //转换base64文件大小限制
             limit:10
           }
         }
       ]
     },
     {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          options: {
            pngquant: {
              quality: [0.65, 0.90] // 设置品质区间
            },
          }
        },
      ],
    }
   ]
 }

## copy-webpack-plugin 拷贝文件
 
 npm i copy-webpack-plugin -D

 const CopyWebpackPlugin=require('copy-webpack-plugin');

  new CopyWebpackPlugin({
    patterns: [
        { from: "source", to: "dest" },
      ],
  })
