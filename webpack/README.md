
# webpack@5.0 项目基础配置模版
___

## 依赖项见 package.json
___

## 基础配置及说明见 webpack.config.js
___

## 配置项
___

 * entry
 * output
 * devServer
 * plugins
 * module
 * optimization
 * mode (在webpack启动脚本中配置)


## 启动脚本
___

 * "build":"webpack --mode development|production"
 * "dev":"webpack serve --mode development|production"

## 插件｜loader
___

 * clean-webpack-plugin
 * copy-webpack-plugin
 * html-webpack-plugin
 * mini-css-extract-plugin
 * css-minimizer-webpack-plugin

 * style-loader 
 * miniCssExtractPlugin.loader
 * css-loader
 * less-loader
 * url-loader
 * file-loader
 * babel-loader
 * ts-loader


## babel配置 .babelrc
___

## ts配置 tsconfig.json

## 手写插件

```javascript

  class Plugin {

    /**
     * 构造函数
     * @param {options} 获取用户给该插件传入的配置
     */
    construcat(options){

    }

    /**
     * webpack会调用apply函数
     * @param {compiler} compiler 对象包含了Webpack环境所有的的配置信息，包含options，loaders，plugins这信息
     */
    apply(compiler){
      /** 通过compiler.hooks提供个各种钩子函数实现需要的功能 */
    }
  }

```

## 手写loader

```javascript

  /**
   * loader函数
   * @param {source} source loader匹配的资源源码
   */
  function loader(source) {
    /** 配合AST抽象语法树进行源码处理 最后返回一个处理后的代码 */
  }

```


