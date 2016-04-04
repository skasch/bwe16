import { List, Map, fromJS } from 'immutable'
import Moment from 'moment'
import { expect } from 'chai'

import { getEvent, postEvent, updateEvent, removeEvent } from '../event/event'
import makeStore from '../flux/store'

import app from '../server/app.js'
import setup from '../server/setup.js'

describe('event logic', () => {
	before(setup)

	describe('handles getEvent', () => {
		const store = makeStore()
		
		before(() => {
			store.dispatch(getEvent())
		})

		it('throws a request', () => {
			expect(store.getState().get('meta').get('working')).to.equal(false)
		})
	})
})