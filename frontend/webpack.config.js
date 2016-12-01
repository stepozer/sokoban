var path      = require("path");
var webpack   = require("webpack");
var bower_dir = __dirname + '/bower_components'

module.exports = {
  entry: "./app/components/router.js",
  output: {
    path: __dirname,
    filename: './app/webroot/bundle.js'
  },
  resolve: {
    modulesDirectories: ["web_modules", "node_modules"]
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
    )
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: [/bower_components/, /node_modules/],
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy'],
          presets: ['react', 'es2015', 'stage-2', 'stage-0'],
        },
      },
    ],
  },
};
