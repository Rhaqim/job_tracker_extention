const path = require('path');

module.exports = {
  entry: {
    background: './src/background.ts', // Entry point for background script
    popup: './src/popup.ts', // Entry point for popup script
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};

