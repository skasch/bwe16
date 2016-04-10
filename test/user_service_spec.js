import {Map, fromJS} from 'immutable'
import {expect} from 'chai'

import setup from '../server/setup.js'
import { 
	get
	,post
	,getByEmail
	,getAll
	,updateGroup
} from '../user/user_service'


describe('userService', () => {
	before(setup)

	// after(() => {
	// 	get()
	// 		.then((events) => events.keySeq().take(2).forEach(id => remove(id)))
	// })
	
	it('posts a user to the database', () => {
		const user = fromJS({
			name: 'skasch'
			,email: 'tacocat'
			,password: 'browssaq'
		})
		const res = post(user)
			.then(table => table
				.get(table.keySeq().first())
				.delete('serverdate'))
		return expect(res).to.eventually.equal(fromJS({
			name: 'skasch'
			,email: 'tacocat'
			,password: 'browssaq'
			,groupId: ''
		}))
	})
	
	it('returns an error if posting a user already in the database', () => {
		const user = fromJS({
			name: 'skasch'
			,email: 'watermelon'
			,password: 'browssaq'
		})
		const res = post(user)
			.then(() => post(user))
		return expect(res).to.eventually.equal(fromJS({
			err: 'Email already in use'
		}))
	})

	it('gets a user by its id', () => {
		const user = fromJS({
			name: 'skasch'
			,email: 'toMayto'
			,password: 'browssaq'
		})
		const id = post(user)
			.then(res => res.keySeq().first())
		const res = id
			.then(id => get(id))
			.then(user => user
				.get(user.keySeq().first())
				.remove('serverdate'))
		return expect(res).to.eventually.equal(fromJS({
			name: 'skasch'
			,email: 'toMayto'
			,password: 'browssaq'
			,groupId: ''
		}))
	})

	it('gets a user by its email address', () => {
		const user = fromJS({
			name: 'skasch'
			,email: 'IMFLYING'
			,password: 'browssaq'
		})
		const res = post(user)
			.then(() => getByEmail(user.get('email')))
			.then(user => user
				.get(user.keySeq().first())
				.remove('serverdate'))
		return expect(res).to.eventually.equal(fromJS({
			name: 'skasch'
			,email: 'IMFLYING'
			,password: 'browssaq'
			,groupId: ''
		}))
	})

	it('updates the group of a user', () => {
		const user = fromJS({
			name: 'skasch'
			,email: 'Youdontsay'
			,password: 'browssaq'
		})
		const id = post(user)
			.then(user => user.keySeq().first())
		const res = id
			.then(id => updateGroup('supermegaadmin', id))
			.then(user =>
				user.get(user.keySeq().first())
				.remove('serverdate'))
		return expect(res).to.eventually.equal(fromJS({
			name: 'skasch'
			,email: 'Youdontsay'
			,password: 'browssaq'
			,groupId: 'supermegaadmin'
		}))
	})
})