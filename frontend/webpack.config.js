const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    clean: true,
    assetModuleFilename: "images/[hash][ext][query]",
    publicPath: "/",
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
    }),
    // new MiniCssExtractPlugin(), // Typically not used in development mode
    new BundleAnalyzerPlugin({
      openAnalyzer: false, // Set to false if you don't want the report to open in a new browser window automatically
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { modules: true } },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { modules: true } },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss"],
    alias: {
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@elements": path.resolve(__dirname, "./src/elements"),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    historyApiFallback: true,
    port: 3000,
    open: true,
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
};
