var path = require('path');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var HtmlWebpackPlugin = require('html-webpack-plugin')

var config = {
    entry: [
        './src/index.js'
    ],
    resolve: {
        extensions: ['', '.js']
    },
    output: {
        path: 'build',
        filename: '[name].js'
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