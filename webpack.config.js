const path = require('path');

module.exports = (env) => {
    const isProduction = env === 'production';
    return {
        mode: 'development',
        entry: ['babel-polyfill', './src/index.js'],
        output: {
            path: path.join(__dirname, 'public'),
            publicPath: '/public/',
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }]
        },
        //devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/' // in index.html body put <script src="/dist/bundle.js"></script>
        }       
    };
};