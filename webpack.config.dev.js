const path = require('path');
const webpack = require('webpack');
require('dotenv').config();
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

const config = {
	devtool: 'cheap-module-eval-source-map',
	mode: 'development',
	entry: [
		'babel-polyfill',
		'webpack-hot-middleware/client?reload=true',
		'./index.js',
	],
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		hot: true,
		proxy: {
			'/': JSON.stringify(process.env.URL_BACKEND),
		},
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
			__URL_BACKEND__: JSON.stringify(process.env.URL_BACKEND),
		}),
	],
	module: {
		rules: [
			{
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
					{
						loader: 'sass-resources-loader',
						options: {
							resources: [
								path.resolve(__dirname, './src/scss/_variables.scss'),
								path.resolve(__dirname, './src/scss/_mixins.scss'),
							],
						},
					},
				],
				test: /\.scss$/,
				exclude: /node_modules/,
			},
			{
				use: ['style-loader', 'css-loader'],
				test: /\.css$/,
			},
		],
	},
};

module.exports = smp.wrap(merge(baseConfig, config));
