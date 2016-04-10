import {Map, fromJS} from 'immutable'
import Moment from 'moment'
import {expect} from 'chai'

import makeStore from '../flux/store'
import * as eventTypes from '../event/event_action_types'

describe('store', () => {
	it('is a Redux store configured with the correct reducer', () => {
		const store = makeStore()

		expect(store.getState()).to.equal(fromJS({
			meta: {
				working: false
				,error: ''
			}
			,event: {
				data: {}
			}
		}))

		store.dispatch({ type: eventTypes.GET_REQUEST })

		expect(store.getState().get('meta').get('working')).to.equal(true)

		store.dispatch({
			type: eventTypes.POST_SUCCESS
			,payload: {
				event: {
					foo: 'bar'
				}
			}
		})

		expect(store.getState().get('event').get('data').get('foo'))
			.to.equal('bar')
	})
})