const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    assetModuleFilename: 'assets/images/[name][ext]'
  },
  devServer: {
    open: true,
    hot: true,
    port: 8080,
  }, 
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/images'),
          to:   path.resolve(__dirname, 'dist/images')
        }
      ]
    }),
  ],
  module: {
    rules: [
        {
          test: /\.(ico|svg|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [MiniCssExtractPlugin.loader, 
            "css-loader", 
            { loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          'sass-loader'],
        },
    ],
},
};