const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  watch: true,
  entry: {
    main: [
      path.resolve(__dirname, "src/index.js"),
      path.resolve(__dirname, "styles/index.css"),
    ],
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
  },

  module: {
    rules: [{ test: /\.css$/, use: ["style-loader", "css-loader"] }],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      title: "Weather App",
      template: path.resolve(__dirname, "src/index.tmp.html"),
      filename: "index.bundle.html",
    }),
  ],
};
