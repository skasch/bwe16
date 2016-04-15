var Webpack = require('webpack')
var CompressionPlugin = require('compression-webpack-plugin')

function gzipMaxCompression(buffer, done) {
	return zlib.gzip(buffer, { level: 9 }, done)
}

module.exports = {
	entry: [
		'./client/index.jsx'
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
	,plugins: [
	  new Webpack.NoErrorsPlugin()
	  ,new Webpack.DefinePlugin({
	    '__DEV__': false
	    ,'process.env': {
	      'NODE_ENV': JSON.stringify('production')
	    }
	    ,"global.GENTLY": false
	  })
	  ,new Webpack.optimize.UglifyJsPlugin({
	  	comments: false
	  })
	  ,new CompressionPlugin({
	  	algorithm: 'gzip',
	  	test: /\.js$/
	  })
	]
	,debug: true
}