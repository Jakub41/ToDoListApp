/* eslint-disable */
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + '/public/',
        publicPath: '/public/js',
        filename: "bundle.js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            '_': 'underscore',
            '$': 'jquery',
            'Backbone': 'backbone',
            'Mn': 'backbone.marionette',
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map',
        }),
    ],
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            }
        ],
    },

};