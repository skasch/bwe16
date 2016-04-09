var Webpack = require('webpack')

module.exports = {
	entry: [
		'webpack/hot/dev-server'
		,'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
		,'./client/index.jsx'
	]
	,module: {
		loaders: [
			{
				test: /\.jsx?$/
				,exclude: /node_modules/
				,loader: 'babel'
				,query: {
					presets: ['es2015']
				}
			}
			,{ 
				test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/
				,loader: "url-loader?limit=100000" 
			}
			,{ 
				test: /\.json$/
				,loader: "json" 
			}
		]
	}
	,resolve: {
		extensions: ['', '.js', '.jsx']
	}
	,output: {
		path: __dirname + '/dist'
		,publicPath: '/'
		,filename: 'bundle.js'
	}
	,devServer: {
		contentBase: __dirname + '/dist'
		,port: 3000
		,hot: true
	}
	,plugins: [
		new Webpack.HotModuleReplacementPlugin()
	  ,new Webpack.NoErrorsPlugin()
	  ,new Webpack.DefinePlugin({
	    '__DEV__': true
	    ,'process.env': {
	      'NODE_ENV': JSON.stringify('development')
	    }
	    ,"global.GENTLY": false
	  })
	]
	,debug: true
}