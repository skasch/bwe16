import { List } from 'immutable'
import r from 'rethinkdb'
import config from '../config/config'

const DATABASE = config.get('db').get('db')
const TABLES = config.get('db').get('tables')

export default function setup() {
	return r
		.connect(config.get('db'))
		.then(conn => {
			console.log('Database setup')
			return r
				.dbList()
				.run(conn)
				.then(list => {
					if (list.indexOf(DATABASE) === -1) {
						console.log('Create database', DATABASE)
						return r
							.dbCreate(DATABASE)
							.run(conn)
					} else {
						console.log('Database already exists', DATABASE)
						return Promise.resolve(true)
					}
				})
				.then(() => Promise.all(TABLES.map(table => {
					return r
						.db(DATABASE)
						.tableList()
						.run(conn)
						.then(list => {
							if (list.indexOf(table) === -1) {
								console.log('Create table', table)
								return r
									.db(DATABASE)
									.tableCreate(table)
									.run(conn)
							} else {
								console.log('Table already exists', table)
								return Promise.resolve(true)
							}
						})
				})))
				.then(() => {
					console.log('Close connexion')
					return conn.close()
				})
		})
}