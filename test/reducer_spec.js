import {Map, fromJS} from 'immutable'
import Moment from 'moment'
import {expect} from 'chai'

import { CREATE_EVENT } from '../flux/action_types'
import reducer from '../flux/reducer'

describe('reducer', () => {
	it('handles eventReducer action', () => {
		const state = Map()
		const action = {
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
		}
		const nextState = reducer(state, action)

		expect(nextState).to.equal(fromJS({
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