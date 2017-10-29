// node中的引入路径模块
const path = require('path');
// 检查html模板，所以我们需要引入node的glob对象使用
const glob = require('glob');
// 消除多余css 插件
const PurifyCSSPlugin = require("purifycss-webpack");
// 引入webpack
const webpack = require('webpack');
// 打包html
const htmlPlugin= require('html-webpack-plugin');
// 压缩js
const uglify = require('uglifyjs-webpack-plugin');
// 从js中分离css插件
const extractTextPlugin = require("extract-text-webpack-plugin");
// 为处理路径 设置一个 绝对路径
var website ={
    publicPath:"http://192.168.1.101:802/"
}
module.exports = {
    //入口文件的配置项
    entry: {
        entry: './src/js/entry.js'
    },
    //出口文件的配置项
    output: {
        //输出的路径，用了Node语法
        path: path.resolve(__dirname, 'dist'),
        //输出的目录以及文件名称
        filename: 'js/bundle.js',
        // 处理分离后css路径对不上问题
        publicPath:website.publicPath
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module: {
        rules: [
            {
            // 用于匹配处理文件的扩展名的表达式，这个选项是必须进行配置的；
            test: /\.css$/,
            //  引用分离css的plugin
            use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'
                ]
              })
        },
        {
            test:/\.(png|jpg|gif)/ ,
            // 指定使用的loader和loader的配置参数
            use:[{
                loader:'url-loader',
                options:{
                    // 把小于500000B(488kb)的文件打成Base64的格式，写入JS 小于则帮你复制图片过去并引入
                    // limit:500000
                    // 现在是以图片形式引入
                    limit:50,
                    // 指定图片输出的目录
                    outputPath:'images/'
                }
            }]
         }
    ]
    },
    //插件，用于生产模版和各项功能 压缩 会让热更新失效
    plugins: [
        // new uglify(), 
        new htmlPlugin({
            // 是对html文件进行压缩，removeAttrubuteQuotes是却掉属性的双引号
            minify:{
                removeAttributeQuotes:true
            },
            // 为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS
            hash:true,
            // 是要打包的html模版路径和文件名称
            template:'./src/index.html'
        }),
        // 从js中分离css   /css/index.css是设置分离后的路径 除此之外还要修改css-loader的写法  
        // 分离出来后图片路径不对  用publicPath解决 在output中设置
        new extractTextPlugin("css/index.css"),
        new PurifyCSSPlugin({
          // 路劲扫描 nodejs内置 路劲检查
            paths: glob.sync(path.join(__dirname, 'src/*.html'))
        })
    ],
    //配置webpack开发服务功能
    devServer: {
        //设置基本目录结构
        contentBase: path.resolve(__dirname, 'dist'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host: '192.168.1.101',
        //服务端压缩是否开启
        compress: true,
        //配置服务端口号
        port: 802
    }
}

