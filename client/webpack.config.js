const webpack = require("webpack");
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

console.log("IS DEV: ", isDev);

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: "all"
		}
	};

	if (isProd) {
		config.minimizer = [
			new TerserWebpackPlugin(),
			new OptimizeCssWebpackPlugin()
		];
	}

	return config;
};

const config = {
	mode: "development",
	entry: "./src/index.tsx",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.[hash].js",
		publicPath: "/"
	},
	module: {
		rules: [
			{
				test: /\.ts(x)?$/,
				use: ["awesome-typescript-loader"],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: isDev,
							reloadAll: true
						}
					},
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							plugins: function () {
								return [require("precss"), require("autoprefixer")];
							}
						}
					},
					"sass-loader"
				]
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: "./index.html",
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "styles.[hash].css"
		})
	],
	devtool: isDev ? "source-map" : "",
	optimization: optimization(),
	devServer: {
		port: 8080,
		hot: isDev,
		historyApiFallback: true
	}
};

module.exports = config;
