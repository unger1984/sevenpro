const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const SvgStore = require('webpack-svgstore-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const CleanUpStatsPlugin = require('./scripts/cleanup-stats-plugin');

const checkWhy = () => {
	return process.argv.filter(arg => arg === '--why').length > 0;
};

module.exports = {
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: 'bundle.js',
	},
	context: path.resolve(__dirname, 'src'),
	plugins: [
		new ProgressBarPlugin(),
		new SvgStore({
			svgoOptions: {
				plugins: [{ removeTitle: true }],
			},
			prefix: 'icon-',
		}),
		new webpack.ContextReplacementPlugin(/moment[\\]locale$/, /en|ru/),
		new ServiceWorkerWebpackPlugin({
			entry: path.resolve(__dirname, './src/sw.js'),
		}),
		new UnusedFilesWebpackPlugin({
			globOptions: {
				ignore: [
					'node_modules/**/*',
					'index.html',
					'index.prod.html',
				],
			},
		}),
		new CleanUpStatsPlugin({
			child: ['html-webpack-plugin', 'mini-css-extract-plugin', 'serviceworker-plugin'],
		}),
	],

	resolve: {
		alias: {
			helpers: path.resolve(__dirname, './src/helpers'),
			api: path.resolve(__dirname, './src/api'),
			common: path.resolve(__dirname, './src/components/common'),
			constants: path.resolve(__dirname, './src/config/constants'),
			config: path.resolve(__dirname, './src/config'),
		},
		plugins: [new DirectoryNamedWebpackPlugin()],
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.svg$/,
				rules: [
					{
						issuer: /\.js$/,
						use: 'svg-sprite-loader',
					},
					{
						issuer: /\.scss$/,
						use: 'svg-url-loader',
					},
				],
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8000,
							name: 'images/[hash:8]-[name].[ext]',
						},
					},
				],
			},
		],
	},
};

if (checkWhy()) {
	module.exports.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 8890 }));
}
