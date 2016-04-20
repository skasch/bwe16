import eventReducer from '../event/event_reducer'
import EventReducer from '../Event/Event_reducer'
import userReducer from '../user/user_reducer'
import metaReducer from '../meta/meta_reducer'
import mergeReducers from '../modules/mergeReducers'

export default mergeReducers({
	event: eventReducer
	,Event: EventReducer
	,user: userReducer
	,meta: metaReducer
})