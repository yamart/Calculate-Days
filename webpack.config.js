var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['./src/main.tsx', './sass/main.scss'],
    devtool: 'source-map',
    output: {
        filename: 'main.js',
        path: __dirname + '/public/scripts'
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                loader: 'css-loader?importLoaders=1',
            }),
        },
        {
            test: /\.(sass|scss)$/,
            loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
        }]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    externals: {

    },
    plugins: [
        new ExtractTextPlugin({ 
            filename: '../css/main.css',
            allChunks: true,
        }),
    ],    
};