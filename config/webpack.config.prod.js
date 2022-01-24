const { merge } = require('webpack-merge')
const path = require('path')
const UserScriptMetaDataPlugin = require('userscript-metadata-webpack-plugin')

const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

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
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
})

module.exports = cfg