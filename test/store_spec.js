import {Map, fromJS} from 'immutable'
import Moment from 'moment'
import {expect} from 'chai'

import makeStore from '../flux/store'
import { CREATE_EVENT } from '../flux/action_types'

describe('store', () => {
	it('is a Redux store configured with the correct reducer', () => {
		const store = makeStore()

		expect(store.getState()).to.equal(fromJS({
			'events': Map()
		}))

		store.dispatch({
			type: CREATE_EVENT
			,payload: {
				eventId: '1234'
				,eventContent: fromJS({
					name: 'Yoga class'
					,startTime: Moment('2016-05-14 9:00')
					,endTime: Moment('2016-05-14 12:00')
					,owner: 'Burning Fanny'
					,description: 'Yoga class for morning stretching'
					,location: 'Yogaholics Camp'
				})
			}
		})

		expect(store.getState()).to.equal(fromJS({
			'events': {
				'1234': {
					name: 'Yoga class'
					,startTime: Moment('2016-05-14 9:00')
					,endTime: Moment('2016-05-14 12:00')
					,owner: 'Burning Fanny'
					,description: 'Yoga class for morning stretching'
					,location: 'Yogaholics Camp'
				}
			}
		}))
	})
})