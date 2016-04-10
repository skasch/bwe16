import {Map, fromJS} from 'immutable'
import Moment from 'moment'
import {expect} from 'chai'

import * as eventTypes from '../event/event_action_types'
import reducer from '../flux/reducer'

describe('reducer', () => {
	it('handles eventReducer action', () => {
		const state = Map()
		const action = {
			type: eventTypes.POST_SUCCESS
			,payload: {
				event: {
					'1234': fromJS({
						name: 'Yoga class'
						,startTime: Moment('2016-05-14 9:00')
						,endTime: Moment('2016-05-14 12:00')
						,owner: 'Burning Fanny'
						,description: 'Yoga class for morning stretching'
						,location: 'Yogaholics Camp'
					})
				}
			}
		}
		const nextState = reducer(state, action)

		expect(nextState.get('event').get('data')).to.equal(fromJS({
			'1234': {
				name: 'Yoga class'
				,startTime: Moment('2016-05-14 9:00')
				,endTime: Moment('2016-05-14 12:00')
				,owner: 'Burning Fanny'
				,description: 'Yoga class for morning stretching'
				,location: 'Yogaholics Camp'
			}	
		}))
	})
})