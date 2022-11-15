const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const mode = isDev ? 'development' : 'production';
const devtool = isDev ? 'source-map' : undefined;

const GetPlugins = () => {
	
    const pluginsArr = [new HTMLWebpackPlugin({
                    template: path.resolve(__dirname, 'src', 'index.html'),
                }),
                new CleanWebpackPlugin(),
                new MiniCssExtractPlugin({
                    filename: isProd ? 'assets/css/styles.css' : '[name].[hash].css',
                }),
            ];

            if(isProd){
                    pluginsArr.push(new ImageminWebpWebpackPlugin({
                        config: [{
                        test: /\.(jpe?g|png)/,
                        options: {
                            quality:  75
                        }
                        }],
                        overrideExtension: true,
                        detailedLogs: true,
                        silent: false,
                        strict: true 
                }));   
            }
            return pluginsArr;
}

module.exports = {
        mode,
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProd ? 'assets/js/boundle.js' : 'assets/js/boundle.[hash].js',
           // assetModuleFilename: 'assets/[name][ext]'
        },
        devtool,
        devServer: {
            port: 3001,
            hot: isDev
        },
        plugins: GetPlugins(),
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    loader: 'html-loader',
                },
                {
                    test: /\.css$/i,
                    use: [ isDev ?  "style-loader" : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // hmr: isDev,
                            // reloadAll: true,
                        },
                    }
                        , "css-loader"],
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        isDev ?  "style-loader" : MiniCssExtractPlugin.loader, 
                        "css-loader", 
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions:  {
                                    plugins: ['autoprefixer'],
                                }
                            }
                        }, 
                        'sass-loader'],
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                debug: isDev,
                            }]
                        ]
                    }
                    },
                },
                {
                    test: /\.woff2?$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/fonts/[name][ext]'
                    }
                },
                {
                    test: /\.(png|jpg|svg|gif|ico|jpeg)?$/i,
                    use: [
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                progressive: true,
                                },
                                optipng: {
                                enabled: false,
                                },
                                pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                                },
                                gifsicle: {
                                interlaced: false,
                                },
                                webp: {
                                quality: 75
                                }
                            }
                        }
                    ],
                    type: 'asset/resource',
                    generator: {
                    filename: 'assets/img/[name][ext]'
                    }
                },
                // {
                //     test: /\.jpg$/i,
                //     type: 'asset/resource',
                //     generator: {
                //       filename: 'assets/webp/[name][ext]'
                //     }
                // },

            ]
        }
}
