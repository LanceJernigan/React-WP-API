const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

const context = path.resolve(__dirname, '..');
const ENTRY_DIR = path.join(context, 'src');
const BUILD_DIR = path.join(context, 'build');
const HTML_TEMPLATE = path.join(BUILD_DIR, 'index.template.html');
const FAVICON = path.join(BUILD_DIR, 'favicon.ico');

module.exports = {
    entry: [
        'babel-polyfill',
        'webpack-dev-server/client?http://localhost:8080',
        path.join(ENTRY_DIR, '/index.js'),
    ],
    output: {
        path: BUILD_DIR,
        publicPath: '/',
        filename: 'assets/[hash].[name].js',
    },
    module: {
        rules: [
            {
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
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-laoder'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIndentName: '[name]__[local]__[hash:base64:5]'
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new HtmlPlugin({
            template: HTML_TEMPLATE,
            favicon: FAVICON
        }),
    ],
    devtool: 'source-map',
}