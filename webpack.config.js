const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //css 하나로 
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require('webpack'); //웹팩 기본 플로그인은 여기있음
const childProcess = require('child_process') // 터미널 명령어를 이거로 실행 할 수 있음 



module.exports = {
    mode: 'production', //development production none
    entry: './src/index.js',
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
        clean: {
          keep: /\.git/,
        },
    },
      module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                // use: [ 
                //     process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'
                //   ] 
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.png|jpg|gif|jpeg|svg$/,
                loader: 'url-loader',
                options: {
                  // publicPath: './dist/',
                  outputPath: './src/assets/images',
                  name: '[name].[ext]?[hash]',
                  limit: 25000, //25kb이상 안넘어가는(작은) 것만 처리..data: asdasdasd 이런 문자열로. 넘지않는건 파일로더가 처리
                }
            }
        ]
    }, 
    plugins: [
        new HtmlWebpackPlugin({   
          template:'./src/index.html', // 현재 작업하는 파일 위치
          filename:'./index.html', // 어디에 만들어놓을지 
          
          minify: process.env.NODE_ENV === 'production' ? { // 배포할떄만 삭제
            collapseWhitespace: true, // 띄어쓰기 삭제
            removeComments: true, //주석 모두 삭제
          } : false,
      }),
        new CleanWebpackPlugin(), // 웹팩 빌드 시 dist폴더에 불필요한거 지워줌
        new MiniCssExtractPlugin()
        // new webpack.BannerPlugin({  // 커스텀으로 만들었던 배너 플로그인.. 웹팩이 제공해주는 기본 플로그인
        //   banner: `
        //     Build Data: ${new Date().toLocaleDateString() }
        //     GIT Commit Ver: ${childProcess.execSync('git rev-parse --short HEAD')} 
        //     user name : ${childProcess.execSync('git config user.name')}
        //   `
        // }),

        // new webpack.DefinePlugin({
        //   TWO: '1+1', // 2출력. 개인적으로 설정하고 싶으면 다른 페이지에서 TWO로 접근가능.. console.log(TWO)
        //   TWO2: JSON.stringify('1+1'), 
        //   'api.domain': JSON.stringify('http://dev-api.domain.com') 
        // }),

        // ...(process.env.NODE_ENV === 'production' ? [ new MiniCssExtractPlugin({ filename: '[name].css' }) ] : []),

        

    ],

    devServer: {
        port: 8080,
        // contentBase: path.join(__dirname, "/src"),
    },

}