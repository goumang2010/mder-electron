var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// var openBrowserWebpackPlugin = require('open-browser-webpack-plugin');

var APP_PATH = path.resolve(__dirname, './src/app.jsx');
var MAIN_PATH = path.resolve(__dirname, './app/main.js');
var BUILD_PATH = process.env.DEV_TARGET === 'web' ? path.join(__dirname, 'builds/web') : path.join(__dirname, 'app/dist');

var config = {
    entry: {
        bundle: APP_PATH
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel-loader?presets[]=es2015,presets[]=react'],
            exclude: /node_modules/
        },
        {
            test: /\.css?$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }]
    },
    target: process.env.DEV_TARGET === 'web' ? 'web' : 'electron-renderer',
    devtool: 'source-map',
    devServer: {
        contentBase: "./app",
        noInfo: false,
        hot: true,
        inline: true,
        publicPath: 'http://localhost:8080/',
        port: 8080,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        stats: {
            colors: true
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("./style/[name].css", {allChunks: false})
        // new openBrowserWebpackPlugin({ url: 'http://localhost:8080' })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {

        }
    }
}

module.exports = config