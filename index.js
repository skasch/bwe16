import makeStore from './flux/store'
import startServer from './io/server'

export const store = maneStore()
startServer(store)