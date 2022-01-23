const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

const webpackConfig = {
    resolve: {
        extensions: ['.js', '.ts']
    },
    optimization: {
        minimize: false,
        moduleIds: 'named',
    },
    entry: './src/index.ts',
    output: {
        publicPath: path.resolve(__dirname, '../dist'),
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.m?js/,
                resolve: {
                  fullySpecified: false,
                },
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
}

module.exports = webpackConfig