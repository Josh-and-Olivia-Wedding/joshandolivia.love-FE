const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");

module.exports = {
	entry: './src/index.ts',
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		path: `${__dirname}/dist`,
		filename: '[name].[contenthash].js',
  		chunkFilename: '[id].[chunkhash].js'
	},
	module: {
		rules: [
			{ 
				test: /\.ts$/, 
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
						},
					  },
				]
			},
			{
				test: /\.css$/,
				// include: path.resolve(__dirname, 'src/assets/styles'),
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(frag|vert|comp)$/,
				use: 'raw-loader',
			},
			{
				test: /\.(woff|woff2|ttf|eot|otf)$/,
				include: path.resolve(__dirname, 'src/assets/fonts'),
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/',
						}
					}
				]
			},
			// {
			// 	test: /\.ttf$/,
			// 	use: [
			// 		{
			// 			loader: 'file-loader',
			// 			options: {
			// 				name: '[name].[ext]',
			// 				outputPath: 'fonts/',
			// 				mimetype: 'font/ttf',
			// 			},
			// 		},
			// 	],
			// },
			{
				test: /\.(svg|avif|png|jpg)$/,
				include: path.resolve(__dirname, 'src/assets'),
				exclude: /node_modules/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: [".js", ".ts"],
		symlinks: false,
		// Webpack dev server throws errors if this line is removed.
		// alias: {dothtml: path.resolve("./node_modules/dothtml")},
		fallback: {
			http: false
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Wedding",
			meta: {
				'viewport': 'width=device-width, initial-scale=1, user-scalable=no'
			},
			favicon: "./src/assets/images/icons/favicon.png"
		}),
		// new CleanWebpackPlugin({
		// 	cleanOnceBeforeBuildPatterns: [path.resolve('.webpack-cache')],
		// }),
		// new CopyWebpackPlugin({
		// 	patterns: [
		// 		{ from: 'workers', to: 'workers' },
		// 	],
		// }),
	],
	optimization:{
		splitChunks: {
			chunks: 'all',
			minSize: 0,
			maxSize: 20000,
			minChunks: 1,
			maxInitialRequests: Infinity,
			enforceSizeThreshold: 20000,
		},
	},
	performance: {
		hints: false,
		maxEntrypointSize: 51200000,
		maxAssetSize: 51200000
	}
};
