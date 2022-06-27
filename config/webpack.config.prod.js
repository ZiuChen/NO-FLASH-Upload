const { merge } = require("webpack-merge");
const UserScriptMetaDataPlugin = require("userscript-metadata-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const metadata = require("./metadata.js");
const webpackConfig = require("./webpack.config.base.js");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const cfg = merge(webpackConfig, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            // comments: /./,
            comments: false,
          },
        },
      }),
    ],
    moduleIds: "named",
  },
  output: {
    filename: "index.prod.user.js",
  },
  plugins: [
    new UserScriptMetaDataPlugin({
      metadata,
    }),
    new BundleAnalyzerPlugin(),
  ],
});

module.exports = cfg;
