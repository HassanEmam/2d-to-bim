const path = require("path");

module.exports = {
  entry: "./src/client.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    fallback: {
      fs: false,
      path: false,
      os: false,
    },
    alias: {
      three: path.resolve("./node_modules/three"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist"),
  },
};
