import {Map} from 'immutable'

export default function(reducers) {
	const validKeys = Object.keys(reducers)
		.filter(key => typeof reducers[key] === 'function')
	return (state, action) => validKeys
		.reduce((state = Map(), key) => state
			.update(key, locState => reducers[key](locState, action)),
		state)
}