const path = require("path");
const { merge } = require("webpack-merge");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const UserScriptMetaDataPlugin = require("userscript-metadata-webpack-plugin");

const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

const metadata = require("./metadata.js");
const webpackConfig = require("./webpack.config.base.js");

metadata.name = "NO-Flash-Upload(dev)";
metadata.require.push(
  "file://" + path.resolve(__dirname, "../dist/index.debug.user.js")
);

const cfg = merge(webpackConfig, {
  mode: "development",
  entry: {
    debug: webpackConfig.entry,
    dev: path.resolve(__dirname, "./dev.js"), // Generate index.dev.user.js
  },
  output: {
    filename: "index.[name].user.js",
    path: path.resolve(__dirname, "../dist"),
  },
  devtool: "eval-source-map",
  watch: true,
  watchOptions: {
    ignored: ["**/node_modules", "**/auto-imports.d.ts", "**/components.d.ts"],
  },
  plugins: [
    new LiveReloadPlugin({
      delay: 500,
      protocol: "https",
    }),
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
});

module.exports = cfg;
