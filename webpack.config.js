const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(sa|sc)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    entry: './src/js/index.js',  // Entry point of your application
    output: {
        filename: 'bundle.js',  // Output bundle file
        path: path.resolve(__dirname, 'dist'),  // Output directory
    },
    // watch: false,
    mode: 'development',
    devServer: {
        port: '8080',
        static: './',
        hot: true, // Enable Hot Module Replacement
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'jOHn pONg',
            template: 'src/template.html'
        })
    ],
};
