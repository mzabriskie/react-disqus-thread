module.exports = {
  entry: './index.js',
  output: {
    filename: './dist/react-disqus-thread.js',
    sourceMapFilename: './dist/react-disqus-thread.map',
    library: 'ReactDisqusThread',
    libraryTarget: 'umd'
  },
  externals: {
    'react': 'React'
  },
  module: {
      loaders: [
        {test: /\.js$/, loader: 'jsx-loader'}
      ]
  }
};