const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    return {
        mode: env.MODE || 'production',
        entry: {
            env: './public/env.js',
            main: './src/index.tsx',
        },
        devtool: env.MODE === 'production' ? false : 'inline-source-map',
        devServer: {
            static: {
                directory: path.resolve(__dirname, 'build'),
            },
            port: 1234,
            hot: true,
            historyApiFallback: true,
            compress: true,
            client: {
                overlay: true,
                progress: true,
            },
            proxy: {
                '/api': 'http://localhost:8000',
                changeOrigin: true,
            },
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                                '@babel/preset-typescript',
                            ],
                        },
                    },
                },
                {
                    test: /\.scss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: undefined,
                                sourceMap: env.MODE !== 'production',
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: env.MODE !== 'production',
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif|svg|pdf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/[name][ext][query]',
                    },
                },
                {
                    test: /\.(woff(2)?|ttf|eot)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name][ext][query]',
                    },
                },
            ],
        },
        resolve: {
            alias: {
                components: path.join('src', 'components'),
                pages: path.join('src', 'pages'),
                assets: path.join('src', 'assets'),
            },
            modules: [__dirname, 'src', 'node_modules'],
            extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './public/index.html'),
                favicon: path.resolve(__dirname, './public/favicon.ico'),
                chunks: ['env', 'main'],
                chunksSortMode: 'manual',
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].min.css',
            }),
            new webpack.ProvidePlugin({
                React: 'react',
            }),
        ],
        output: {
            filename: (chunks) => {
                if (chunks.chunk.name === 'env') {
                    return '[name].js';
                }
                return '[name].[hash].js';
            },
            path: path.resolve(__dirname, 'build'),
            clean: true,
        },
        optimization: {
            minimize: env.MODE === 'production',
            splitChunks: {
                chunks: 'all',
            },
            runtimeChunk: 'single',
        },
        performance: {
            hints: false
        }
    };
};
