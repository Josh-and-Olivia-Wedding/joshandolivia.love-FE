const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
		new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets/images/main-image.jpg', to: 'images/preview.jpg' },
            ],
        }),
		new HtmlWebpackPlugin({
			title: "Wedding",
			meta: [ 
				{'viewport': 'width=device-width, initial-scale=1, user-scalable=no'},
				{ "name": "description", "content": "Welcome to the website for Joshua and Olivia's upcoming wedding. Find all the information you need here." },
				{ "property": "og:title", "content": "Joshua and Olivia's Wedding" },
				{ "property": "og:description", "content": "Welcome to the website for Joshua and Olivia's upcoming wedding. Find all the information you need here." },
				{ "property": "og:image", "content": "images/preview.jpg"},
				{ "property": "og:url", "content": "https://joshandolivia.love" },
				{ "property": "og:type", "content": "website" },
				{ "name": "twitter:card", "content": "summary_large_image" },
				{ "name": "twitter:title", "content": "Joshua and Olivia's Wedding" },
				{ "name": "twitter:description", "content": "Welcome to the website for Joshua and Olivia's upcoming wedding. Find all the information you need here." },
				{ "name": "twitter:image", "content": "images/preview.jpg"},
			],
			favicon: "./src/assets/images/icons/favicon.png"
		}),
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
