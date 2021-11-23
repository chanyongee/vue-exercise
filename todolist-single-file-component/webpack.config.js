//const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        main: path.join(__dirname, 'index.js')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        //new VueLoaderPlugin()
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist'
    }
}