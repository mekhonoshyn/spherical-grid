/*global require, module, __dirname */

const path = require('path');

module.exports = [getConfig({target: 'node'}), getConfig({target: 'web'})];

function getConfig(options) {
    return {
        entry: {
            index: path.resolve(__dirname, 'index.js')
        },
        output: {
            path: __dirname + '/bin',
            filename: `[name].${options.target}.js`
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
        devtool: 'source-map',
        target: options.target,
        node: {
            fs: 'empty'
        }
    };
}
