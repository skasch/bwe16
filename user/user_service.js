import { fromJS, Map } from 'immutable'
import r from 'rethinkdb'
import xss from 'xss'
import config from '../config/config'

function connect() {
	return r
		.connect(config.get('db'))
}

const db = config.get('db').get('db')

export function intoSession(user, done) {
	return done(null, user.keySeq().first())
}

export function outOfSession(userId, done) {
	return connect()
		.then(conn => r
			.db(db)
			.table('user')
			.get(userId)
			.run(conn)
			.then(user => done(null, Map().
						set(fromJS(user).get('id'), 
							fromJS(user)
								.remove('id')
								.remove('password')
								.remove('serverdate')))))
}

export function localAuthCallback(email, password, done) {
	if (email === '' || password === '')
		done(null, false, { message: 'Invalid email or password' })
	return connect()
		.then(conn => r
			.db(db)
			.table('user')
			.getAll(email, { index: 'email' })
			.run(conn)
			.then(cursor => cursor.toArray())
			.then(users => {
				if (!users[0])
					done(null, false, { message: `Email ${email} not found` })
				else if (users[0]['password'] === password)
					done(null, Map().
						set(fromJS(users[0]).get('id'), fromJS(users[0]).remove('id')))
				else
					done(null, false, { message: 'Invalid email or password' })
			}))
}

export function post(user, fields = {}) {
	const serverUser = fromJS({
		serverdate: new Date()
		,name: xss(user.get('name')) || {}
		,email: xss(user.get('email'))
		,password: xss(user.get('password'))
		,groupId: ''
	}).merge(fromJS(fields))
	return connect()
		.then(conn => r
			.db(db)
			.table('user')
			.getAll(serverUser.get('email'), { index: 'email' })
			.run(conn)
			.then(cursor => cursor.toArray())
			.then(users => {
				if (users.length === 0) {
					return r
						.db(db)
						.table('user')
						.insert(serverUser.toJSON())
						.run(conn)
						.then(res => Map().set(res.generated_keys[0], serverUser))
				} else {
					if (user.get('auth') && 
						user.get('auth').get('type') === 'facebook') {
						return getByEmail(user.get('email'))
					}
					return Map().set('err', 'Email already in use')
				}
			}))
}

export function update(userId, field, value) {
	const serverUser = fromJS({
		serverdate: new Date()
	}).set(field, xss(value))
	return connect()
		.then(conn => r
			.db(db)
			.table('user')
			.get(userId)
			.update(serverUser.toJSON())
			.run(conn)
			.then(() => r
				.db(db)
				.table('user')
				.get(userId)
				.run(conn))
			.then(fromJS)
			.then(res => Map().set(res.get('id'), res.remove('id'))))
}

export function get(userId) {
	return connect()
		.then(conn => r
			.db(db)
			.table('user')
			.get(userId)
			.run(conn)
			.then(fromJS)
			.then(res => Map().set(res.get('id'), res.remove('id')))
			.error(err => err))
}

export function getByEmail(email) {
	return connect()
		.then(conn => r
			.db(db)
			.table('user')
			.getAll(email, { index: 'email' })
			.run(conn)
			.then(cursor => cursor.toArray())
			.then(user => user[0])
			.then(fromJS)
			.then(res => Map().set(res.get('id'), res.remove('id')))
			.error(err => err))
}

// export function getAll(userIds) {
// 	return connect()
// 		.then(conn => r
// 			.db(db)
// 			.table('user')
// 			.getAll(...userIds)
// 			.run(conn)
// 			.then(cursor => cursor.toArray())
// 			.then(fromJS)
// 			.error(err => err))
// }

export function updateGroup(groupId, userId) {
	return connect()
		.then(conn => r
			.db(db)
			.table('user')
			.get(userId)
			.update({ groupId: groupId })
			.run(conn)
			.then(() => {
				return r
					.db(db)
					.table('user')
					.get(userId)
					.run(conn)
					.then(fromJS)
					.then(res => Map().set(res.get('id'), res.remove('id')))
					.error(err => err)
			})
			.error(err => err))
}