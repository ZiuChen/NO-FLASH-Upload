const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

const webpackConfig = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
    extensions: [".js", ".ts"],
  },
  entry: "./src/index.ts",
  output: {
    publicPath: path.resolve(__dirname, "../dist"),
    path: path.resolve(__dirname, "../dist"),
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};

module.exports = webpackConfig;
