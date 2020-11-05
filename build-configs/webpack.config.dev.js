const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        main: path.resolve(process.cwd(), 'src/index.js')
    },
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options:  {
                            presets: [
                                '@babel/env',
                                '@babel/react'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            }
                        }
                    }
                ]
            }
        ]
    },
    watchOptions: {
        aggregateTimeout: 1000,
        poll: 1000
    },
    plugins: [
        new LiveReloadPlugin({
            appendScriptTag: true,
            delay: 1000
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}