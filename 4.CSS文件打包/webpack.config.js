// node中的引入路径模块
const path = require('path');
// 引入webpack
const webpack = require('webpack');
module.exports = {
    //入口文件的配置项
    entry: {
        entry: './src/entry.js'
    },
    //出口文件的配置项
    output: {
        //输出的路径，用了Node语法
        path: path.resolve(__dirname, 'dist'),
        //输出的文件名称
        filename: 'bundle.js'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module: {
        rules: [{
            // 用于匹配处理文件的扩展名的表达式，这个选项是必须进行配置的；
            test: /\.css$/,
            //   loader名称，就是你要使用模块的名称，这个选项也必须进行配置，否则报错；
            use: ['style-loader', 'css-loader']
            //   include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）
            // query：为loaders提供额外的设置选项（可选）
        }]
    },
    //插件，用于生产模版和各项功能
    plugins: [

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
        port: 9090
    }
}