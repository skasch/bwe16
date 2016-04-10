import eventReducer from '../event/event_reducer'
import userReducer from '../user/user_reducer'
import metaReducer from '../meta/meta_reducer'
import mergeReducers from '../modules/mergeReducers'

export default mergeReducers({
	event: eventReducer
	,user: userReducer
	,meta: metaReducer
})