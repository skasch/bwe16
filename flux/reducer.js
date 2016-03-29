import eventReducer from '../event/event_reducer'
import mergeReducers from '../modules/mergeReducers'

export default mergeReducers({
	'events': eventReducer
})