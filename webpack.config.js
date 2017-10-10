/*global require, module, __dirname */

const path = require('path');

module.exports = {
    entry: {
        classes: path.resolve(__dirname, 'classes.js'),
        generator: path.resolve(__dirname, 'generator.js')
    },
    output: {
        path: __dirname + '/bin',
        filename: '[name].js',
        library: '',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules')
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['es2015', 'stage-2'],
                        plugins: ['transform-runtime']
                    }
                }
            },
            {
                test: /\.json$/,
                use: {
                    loader: 'json-loader'
                }
            }
        ]
    },
    target: 'node'
};
