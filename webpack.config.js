var webpack = require('webpack')

module.exports = {
	entry: [
		'webpack/hot/dev-server'
		,'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
		,'./client/index.jsx'
	]
	,module: {
		loaders: [{
			test: /\.jsx?$/
			,exclude: /node_modules/
			,loader: 'babel'
			,query: {
				presets: ['es2015']
			}
		}]
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
		new webpack.HotModuleReplacementPlugin()
	  ,new webpack.NoErrorsPlugin()
	  ,new webpack.DefinePlugin({
	    '__DEV__': true
	    ,'process.env': {
	      'NODE_ENV': JSON.stringify('development')
	    }
	  })
	]
	,debug: true
}