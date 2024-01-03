const path = require('path');

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
    mode: 'none'
};
