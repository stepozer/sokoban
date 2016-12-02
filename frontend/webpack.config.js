var path      = require("path");
var webpack   = require("webpack");

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
        exclude: [/node_modules/],
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
