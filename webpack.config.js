let path = require('path'),
    process = require('process');

// 这边使用 HtmlWebpackPlugin，将 bundle 好的 <script> 插入到 body。${__dirname} 为 ES6 语法对应到 __dirname
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `${__dirname}/router-demo/demo01/index.html`,
    filename: 'index.html',
    inject: 'body',
});

module.exports = {
    // 档案起始点从 entry 进入，因为是阵列所以也可以是多个档案
    entry: [
        './router-demo/demo01/index.js',
    ],
    output: {
        /**
         * 输出目录
         *
         * 该配置问绝对目录
         */
        path: `${__dirname}/dist`,
        /**
         * 输出文件名
         *
         * [name]--被替换为块的名称
         * [hash]--被编译的哈希取代
         * [chunkhash]--由数据块(分片)的哈希取代
         *
         * 也可指定目录 'static/js/[name].[hash].js'
         */
        filename: '[name].js',
        /**
         * 前缀路径
         *
         * 如果想将生成的文件放到cdn, 那么必须配置此项
         */
        publicPath: '',
        /**
         * 非输入块的文件输出的文件名
         *
         * [id]--被替换为块的id
         * [name]--被替换为块的名称
         * [hash]--被编译的哈希取代
         * [chunkhash]--由数据块的哈希取代
         *
         * 也可以指定目录 'static/js/[name].[chunkhash].chunk.js'
         */
        chunkFilename: '',
        /**
         * sourceMapFilename
         *
         * sourceMap输出文件名
         *
         * [file]--被js文件的文件名替换
         * [id]--被替换为块的身份证
         * [hash]--被编译的哈希所替代
         */
        /**
         * devtoolModuleFilenameTemplate
         *
         * 默认或者不配置即可
         *
         * 默认值 (devtool=[inline-]source-map): “webpack:///[resource-path]”
         * 默认值 (devtool=eval): “webpack:///[resource-path]?[loaders]”
         * 默认值 (devtool=eval-source-map): “webpack:///[resource-path]?[hash]”
         *
         */
        /**
         * devtoolFallbackModuleFilenameTemplate
         *
         * 默认或者不配置即可
         *
         * 默认值: “webpack:///[resourcePath]?[hash]”
         */
        /**
         * devtoolLineToLine
         *
         * 默认或者不配置即可
         *
         * 默认值: 禁用
         */
        /**
         * hotUpdateChunkFilename
         *
         * 默认或者不配置即可
         *
         * 默认值: “[id].[hash].hot-update.js”
         */
        /**
         * hotUpdateMainFilename
         *
         * 默认或者不配置即可
         *
         * 默认值: “[hash].hot-update.json”
         */
        /**
         * jsonpFunction
         *
         * 默认或者不配置即可
         *
         * 默认值: “webpackJsonp”
         */
        /**
         * hotUpdateFunction
         *
         * 默认或者不配置即可
         *
         * 默认值: “webpackHotUpdate”
         */
        /**
         * library
         *
         * 如果设置，将导出包作为库。 output.library作为名字。
         * 如果您正在编写一个库，并希望将其发布为单个文件, 那么可以设置该项
         */
        /**
         * libraryTarget
         *
         * 导出库的格式
         * “var” “this” “commonjs” “commonjs2” “amd” “umd”
         */
    },
    module: {
        /**
         * loaders 加载器, 对象数组
         *
         * test: 匹配规则
         * exclude: 排除目录
         * include: 包含目录
         * loader: 加载器(字符串)
         * loaders: 加载器(数组)
         *
         * 加载器后面的-loader可以省略写成loader: "babel"
         */
        loaders: [
            {
                test: /\.js(x)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                }
            },
        ],
        /**
         * 用于变以前监测或生成sourceMap等
         *
         * 设置格式与loaders一样
         */
        preLoaders: [
            {
                test: /\.js(x)?$/,
                loader: 'eslint-loader',
                include: `${__dirname}/src`,
                exclude: /bundle\.js$/
            }
        ],
    },
    resolve: {
        /**
         * 设置别名
         *
         * require('src/app.js')只需要写成require('js/app.js')
         */
        alias: {
            js: path.join(__dirname, 'src')
        },
        /**
         * 默认搜索路径
         *
         * 将包含模块的目录(绝对路径)添加在搜索路径中,可以是目录数组
         */
        root: [
            path.join(process.cwd(), '')
        ],
        /**
         * 用于解决模块的拓展数组, 配置后,数组里的扩展名在 require 时可以忽略
         */
        extensions:[
            '', '.js', '.jsx', 'css'
        ]
    },
    /**
     * 指定依赖关系
     */
    externals: {
        // jQuery 为 cdn 直接在页面引用时,必须配置此项
        'jquery': 'jQuery'
    },
    /**
     * 配置打包后的代码允许执行的环境
     *
     * 'web(默认值)'、'node'、'webworker'、'async-node'、'node-webkit'、'electron'
     */
    target: 'web',

    /**
     * 配置webpack-dev-server
     */
    devServer: {
        inline: true,
        port: 8008,
    },
    // plugins 放置所使用的外挂
    plugins: [HTMLWebpackPluginConfig],
};