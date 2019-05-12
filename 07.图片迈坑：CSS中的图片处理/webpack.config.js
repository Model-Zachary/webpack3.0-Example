// node中的引入路径模块
const path = require('path');
// 引入webpack
const webpack = require('webpack');
// 打包html
const htmlPlugin= require('html-webpack-plugin');
// 压缩js
const uglify = require('uglifyjs-webpack-plugin');
module.exports = {
    //入口文件的配置项
    entry: {
        entry: './src/js/entry.js'
    },
    //出口文件的配置项
    output: {
        //输出的路径，用了Node语法
        path: path.resolve(__dirname, 'dist'),
        //输出的文件名称
        filename: 'js/bundle.js'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module: {
        rules: [
            {
            // 用于匹配处理文件的扩展名的表达式，这个选项是必须进行配置的；
            test: /\.css$/,
            //   loader名称，就是你要使用模块的名称，这个选项也必须进行配置，否则报错；
            use: ['style-loader', 'css-loader']
            //   include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）
            // query：为loaders提供额外的设置选项（可选）
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
    //插件，用于生产模版和各项功能 压缩打开 热更新就会失效
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
           
        })
    ],
    //配置webpack开发服务功能
    devServer: {
        //设置基本目录结构
        contentBase: path.resolve(__dirname, 'dist'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host: 'localhost',
        //服务端压缩是否开启
        compress: true,
        //配置服务端口号
        port: 9079
    }
}