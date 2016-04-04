import eventReducer from '../event/event_reducer'
import metaReducer from '../meta/meta_reducer'
import mergeReducers from '../modules/mergeReducers'

export default mergeReducers({
	'event': eventReducer
	,'meta': metaReducer
})