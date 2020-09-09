const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Softgames Test',
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'main.bundle.css'
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' }
            ],
        })        
    ],
    module: {
        rules: [        
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};