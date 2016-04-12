import {Map, fromJS, List} from 'immutable'
import r from 'rethinkdb'
import xss from 'xss'
import config from '../config/config'
			
const ENTRIES = List.of(
	'name'
	,'startTime'
	,'endTime'
	,'owner'
	,'description'
	,'location'
)

function connect() {
	return r
		.connect(config.get('db'))
}

export function get() {
	return connect()
		.then(conn => r
			.db(config.get('db').get('db'))
			.table('event')
			.orderBy('startTime')
			.run(conn)
			.then(res => res.toArray())
			.then(fromJS)
			.then(list => list
				.reduce(
					(res, elem) => res.set(elem.get('id'), elem.remove('id'))
					,Map()
				)))
}

export function post(event) {
	const serverEvent = Map()
		.set('serverdate', new Date())
		.merge(ENTRIES
			.reduce(
				(event, entry) => {
					return event.set(entry, xss(event.get(entry)))
				},fromJS(event)
			))
	return connect()
		.then(conn => r
			.db(config.get('db').get('db'))
			.table('event')
			.insert(serverEvent.toJSON())
			.run(conn))
		.then(res => {
			return Map().set(res.generated_keys[0], serverEvent)
		})
}

export function update(id, event) {
	const serverEvent = Map()
		.set('serverdate', new Date())
		.merge(ENTRIES
			.filter(entry => entry in fromJS(event).keySeq())
			.reduce((event, entry) => event.set(entry, xss(event.get(entry))), 
				fromJS(event)))
	return connect()
		.then(conn => r
			.db(config.get('db').get('db'))
			.table('event')
			.get(id)
			.update(serverEvent.toJSON())
			.run(conn)
			.then(() => r
				.db(config.get('db').get('db'))
				.table('event')
				.get(id)
				.run(conn))
			.then(fromJS)
			.then(res => {
				return Map().set(res.get('id'), res.remove('id'))
			}))
}

export function remove(id) {
	return connect()
		.then(conn => r
			.db(config.get('db').get('db'))
			.table('event')
			.get(id)
			.delete()
			.run(conn))
		.then(() => id)
}