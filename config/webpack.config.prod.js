const { merge } = require('webpack-merge')
const path = require('path')
const UserScriptMetaDataPlugin = require('userscript-metadata-webpack-plugin')

const metadata = require('./metadata.js')
const webpackConfig = require('./webpack.config.base.js')

const cfg = merge(webpackConfig, {
    mode: 'production',
    output: {
        filename: 'index.prod.user.js'
    },
    plugins: [
        new UserScriptMetaDataPlugin({
            metadata,
        }),
    ],
})

module.exports = cfg