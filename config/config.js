import {fromJS} from 'immutable'
const isProduction = process.env.NODE_ENV === 'production'

const defaultConfig = fromJS(require('./default.json'))
const prodConfig = fromJS(require('./production.json'))
const devConfig = fromJS(require('./development.json'))

const config = isProduction ?
	defaultConfig.mergeDeep(prodConfig) :
	defaultConfig.mergeDeep(devConfig)

export default config
