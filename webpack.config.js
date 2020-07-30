const path = require('path');

const PORT = process.env.PORT || '9000';
const CONTEXT_PATH = path.resolve('.');
const DIST_PATH = `${CONTEXT_PATH}/dist`;
const SRC_PATH = `${CONTEXT_PATH}/src`;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map', // Enable sourcemaps for debugging webpack's output.
  context: CONTEXT_PATH,
  entry: `${SRC_PATH}/index.tsx`,
  resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
  output: {
    path: `${DIST_PATH}`,
    publicPath: '/',
    filename: 'app-[hash].bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: `${SRC_PATH}/public/index.html`,
    }),
  ],
  devServer: {
    inline: true,
    historyApiFallback: true,
    port: PORT,
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.(css)$/,
        include: [
          /(src\/public\/base.css)/,
          /(node_modules\/normalize.css)/,
        ],
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|m4a)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name]-[hash].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name]-[hash].[ext]',
        },
      },
    ],
  },
};
