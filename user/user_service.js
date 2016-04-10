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
	return done(null, user.id)
}

export function outOfSession(userId, done) {
	return connect()
		.then(conn => r
			.db(db)
			.table('user')
			.get(userId)
			.run(conn)
			.then(user => done(null, user)))
}

export function localAuthCallback(email, password, done) {
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
				else if (user[0]['password'] === password)
					done(null, user[0])
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
					return Map().set('err', 'Email already in use')
				}
			}))
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