// @ts-nocheck
import path from "path";
import { merge } from "webpack-merge";
import UserScriptMetaDataPlugin from "userscript-metadata-webpack-plugin";
import metadata from "./metadata";
import webpackConfig from "./webpack.config.base";

metadata.name = "NO-Flash-Upload(dev)";
metadata["name:en"] = "NO-Flash-Upload(dev)";
metadata.require.push(
  "file://" + path.resolve(__dirname, "../dist/index.debug.user.js")
);

export default merge(webpackConfig, {
  mode: "development",
  entry: {
    debug: webpackConfig.entry,
    dev: path.resolve(__dirname, "./dev.ts"), // Generate index.dev.user.js
  },
  optimization: {
    minimize: false,
    moduleIds: "named",
  },
  output: {
    filename: "index.[name].user.js",
    path: path.resolve(__dirname, "../dist"),
  },
  devtool: "eval-source-map",
  watch: true,
  watchOptions: {
    ignored: ["**/node_modules"],
  },
  plugins: [
    new UserScriptMetaDataPlugin({
      metadata,
    }),
  ],
});
