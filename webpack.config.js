const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  target: "web",
  devtool: "source-map",
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("https://api.themoviedb.org/3/"),
      "process.env.API_KEY": JSON.stringify("8a14b7ca9dafe32bc6fc708c1acce3f8")
    })
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader'
      }
    ]
  }
};
