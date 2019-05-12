// node中的引入路径模块
const path = require('path');
// 引入webpack
const webpack = require('webpack');
module.exports = {
     //入口文件的配置项
    entry:{
        entry:'./src/entry.js',
         //这里我们又引入了一个入口文件
        entry2:'./src/entry2.js'
    },
     //出口文件的配置项
    output:{
        //输出的路径，用了Node语法
        path:path.resolve(__dirname,'dist'),
        //输出的文件名称
        filename:'[name].js'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{

    },
     //插件，用于生产模版和各项功能
     plugins:[

     ],
     //配置webpack开发服务功能
     devServer:{

     }
}