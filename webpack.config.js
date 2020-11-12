/* eslint-disable no-undef */
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
console.log(process.env.NODE_ENV)



const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config
}
const fileName = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`


const cssLoaders = extra => {
    const loaders = [{
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            },
        },
        'css-loader'
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}
const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]
    if (isDev) {
        loaders.push('eslint-loader')
      }
    
      return loaders
}
const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['@babel/polyfill', './Index.js'],
    },
    mode: 'development',
    output: {
       
        filename: fileName("js"),
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: fileName('css')
        }),
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: ['.js', '.json', '.css', '.vue', '...'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),

        }
    },
    optimization: optimization(),
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000,
        compress: true,

    },
    devtool: isDev ? 'source-map' : '',
    module: {
        rules: [{
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.scss$/,
                use: cssLoaders('sass-loader')

            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        hmr: isDev,
                        reloadAll: true
                    }
                }
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        hmr: isDev,
                        reloadAll: true
                    }
                }
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        hmr: isDev,
                        reloadAll: true,
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/,/webpackconfig/ ],
                use: jsLoaders()
            },

        ]
    }
}