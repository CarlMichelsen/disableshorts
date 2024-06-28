const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        background: './src/background.ts',
        content_script: './src/content_script.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/manifest.json', to: './' }
            ]
        })
    ]
};