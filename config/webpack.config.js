var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        // 'babel-polyfill',  Polyfill needs to be at a global scope in our design layout.
        './src/index'
    ],
    output: {
        path: path.join(__dirname, '..', 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                "presets": [
                    [
                        "env",
                        {
                            "targets": {
                                "browsers": [
                                    "> 1%",
                                    "last 2 versions"
                                ],
                            },
                            "loose": true,
                            "useBuiltIns": true,
                        }
                    ],
                    "react"
                ],
                "plugins": [
                    "transform-object-rest-spread",
                    "transform-class-properties"
                ]
            },
        },]
    }
};