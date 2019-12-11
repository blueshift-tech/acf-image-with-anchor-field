const Path = require('path');
const Webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  stats: 'errors-only',
  bail: true,
  entry: {
    input: Path.join(__dirname, 'src/input.js'),
    style: Path.join(__dirname, 'src/input.scss')
  },
  output: {
    path: Path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: "/^!/"
          }
        }
      })
    ]
  },
  devServer: {
    historyApiFallback: true,
    compress: true,
    port: 9000,
    https: true,
    hot: true,
    proxy: {
      '*': {
        'target': 'https://boilerplate.gruhn',
        'secure': true
      }
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new Webpack.optimize.ModuleConcatenationPlugin(),
    new BrowserSyncPlugin({
      proxy: 'https://boilerplate.gruhn',
      files: [
        'src/**/*.scss',
        'src/**/*.js',
        '**.php',
        'src/**/*.twig'
      ],
      injectCss: true,
      reload: false
    }, {
      reload: false
    })
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
            }
          },
          'babel-loader'
        ]
      },
      {
        test: /\.s?css/i,
        use : [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('postcss-preset-env')(),
                require('cssnano')()
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['src/_settings']
              }
            }
          }
        ]
      }
    ]
  }
};
