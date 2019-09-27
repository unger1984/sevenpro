const path = require('path');
const uuid = require('uuid/v4');
require('dotenv').config();
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

const checkWhy = () => {
	return process.argv.filter(arg => arg === '--why').length > 0;
};

const config = {
	entry: ['babel-polyfill', './index.js'],
	mode: 'production',
	context: path.resolve(__dirname, 'src'),
	output: {
		filename: '[name].js?v=[chunkhash:4]',
	},
	optimization: {
		minimizer: [new UglifyJsPlugin()],
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
					name(module) {
						// get the name. E.g. node_modules/packageName/not/this/part.js
						// or node_modules/packageName
						const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
						const packageName = match ? match[1] : uuid();

						// npm package names are URL-safe, but some servers don't like @ symbols
						return `npm.${packageName.replace('@', '')}`;
					},
				},
			},
		},
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			__URL_BACKEND__: JSON.stringify(''),
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.prod.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].[contenthash].css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: function() {
								return [autoprefixer('last 2 versions')];
							},
						},
					},
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
			},
		],
	},
};

if (checkWhy()) {
	config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = smp.wrap(merge(baseConfig, config));
