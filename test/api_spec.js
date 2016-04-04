import {Map, fromJS} from 'immutable'
import request from 'supertest'
import {expect} from 'chai'

import setup from '../server/setup.js'
import { eventApi } from '../server/api'
import app from '../server/app' 

describe('eventApi', () => {
	it('handles get requests', done => {
		request(app)
			.get('/api/event')
			.end((err, res) => {
				if (err) return done(err)
				expect(err).to.equal(null)
				expect(res.body).to.be.an('object')
				done()
			})
	})
})