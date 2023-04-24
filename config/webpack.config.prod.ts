// @ts-nocheck
import { merge } from "webpack-merge";
import UserScriptMetaDataPlugin from "userscript-metadata-webpack-plugin";
import metadata from "./metadata";
import webpackConfig from "./webpack.config.base";
import * as BundleAnalyzerPlugin from "webpack-bundle-analyzer";

export default merge(webpackConfig, {
  mode: "production",
  optimization: {
    minimize: true,
    moduleIds: "named",
  },
  output: {
    filename: "index.prod.user.js",
  },
  plugins: [
    new UserScriptMetaDataPlugin({
      metadata,
    }),
    new BundleAnalyzerPlugin.BundleAnalyzerPlugin(),
  ],
});
