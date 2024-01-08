const path = require("path");

module.exports = {
  entry: "/themes/app.js",
  mode: "production",
  devtool: "inline-source-map",
  devServer: {
    static: "./docs",
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "docs"),
    library: {
      name: "theHourglass",
      type: "umd",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 1000000,
  },
  // optimization: {
  //   runtimeChunk: "single",
  // },
};
