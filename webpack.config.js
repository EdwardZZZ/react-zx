var path = require('path');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var HtmlWebpackPlugin = require('html-webpack-plugin')

var config = {
    entry: [
        'webpack-dev-server/client?http://localhost:9000',
        'webpack/hot/dev-server', 
        './index.js'
    ],
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel']
        }]
    },
    devServer: {
        port: 9000,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: true
        })
    ]
};

module.exports = config;