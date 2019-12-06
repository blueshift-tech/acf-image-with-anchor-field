const Webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  stats: 'errors-only',
  bail: true,
  entry: {
    bundle: Path.join(__dirname, 'src/manifest.js')
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
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new Webpack.optimize.ModuleConcatenationPlugin()
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
