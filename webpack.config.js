const path = require("path");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");
const { RunScriptWebpackPlugin } = require("run-script-webpack-plugin");

module.exports = {
  devtool: "inline-source-map",
  entry: ["webpack/hot/poll?1000", path.join(__dirname, "src/main.ts")],
  externals: [
    nodeExternals({
      allowlist: ["webpack/hot/poll?1000"],
    }),
  ],
  mode: "development",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin({
      paths: [/\.js$/, /\.d\.ts$/],
    }),
    new RunScriptWebpackPlugin({ name: "server.js" }),
  ],
  watch: true,
  module: {
    rules: [
      {
        exclude: [path.resolve(__dirname, "node_modules")],
        test: /\.ts$/,
        use: "ts-loader",
      },
      {
        test: /\.(graphql|gql)$/,
        loader: "graphql-tag/loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  target: "node",
};
