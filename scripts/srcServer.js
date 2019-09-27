import path from 'path';
import http from 'http';
import { readFileSync } from 'fs';
import express from 'express';
import webpack from 'webpack';
import config from '../webpack.config.dev';

process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';

/* eslint-disable no-console */

console.log('Starting app in dev mode...');

const port = process.env.PORT ? process.env.PORT : 8080
const app = express();
const compiler = webpack(config);

app.use(
	require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath,
		watchOptions: {
			poll: 1000,
			ignored: /node_modules/,
		},
	}),
);

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../src/index.html'));
});

http
	.createServer(app,)
	.listen(port, () => {
		console.log('Application successfully started on port ' + port);
	});
