import { List } from 'immutable'
import r from 'rethinkdb'
import config from '../config/config'

const DATABASE = config.get('db').get('db')
const TABLES = config.get('db').get('tables')
const INDEXES = config.get('db').get('indexes')

export default function setup() {
	return r
		.connect(config.get('db').toJSON())
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
				.then(() => Promise.all(TABLES.map(table => {
					return r
						.db(DATABASE)
						.table(table)
						.indexList()
						.run(conn)
						.then(list => {
							if (INDEXES.get(table) &&
								list.indexOf(INDEXES.get(table)) === -1) {
								console.log('Create index', INDEXES.get(table), 
									'for table', table)
								return r
									.db(DATABASE)
									.table(table)
									.indexCreate(INDEXES.get(table))
									.run(conn)
							}
						})
				})))
				.then(() => {
					console.log('Close connexion')
					return conn.close()
				})
		})
}

setup()