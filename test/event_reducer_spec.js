import {Map, fromJS} from 'immutable'
import Moment from 'moment'
import {expect} from 'chai'

import { CREATE_EVENT, EDIT_EVENT, REMOVE_EVENT } from '../flux/action_types'
import eventReducer from '../event/event_reducer'

describe('eventReducer', () => {
	it('handles CREATE_EVENT action', () => {
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
		const nextState = eventReducer(state, action)

		expect(nextState).to.equal(fromJS({
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

	it('handles EDIT_EVENT action', () => {
		const state = fromJS({
			'1234': {
				name: 'Yoga class'
				,startTime: Moment('2016-05-14 9:00')
				,endTime: Moment('2016-05-14 12:00')
				,owner: 'Burning Fanny'
				,description: 'Yoga class for morning stretching'
				,location: 'Yogaholics Camp'
			}
		})
		const action = {
			type: EDIT_EVENT
			,payload: {
				eventId: '1234'
				,eventContent: fromJS({
					name: 'Yoga beginner class'
					,startTime: Moment('2016-05-14 8:30')
					,description: 'Yoga class for every one!'
				})
			}
		}
		const nextState = eventReducer(state, action)

		expect(nextState).to.equal(fromJS({
			'1234': {
				name: 'Yoga beginner class'
				,startTime: Moment('2016-05-14 8:30')
				,endTime: Moment('2016-05-14 12:00')
				,owner: 'Burning Fanny'
				,description: 'Yoga class for every one!'
				,location: 'Yogaholics Camp'
			}
		}))
	})

	it('handles REMOVE_EVENT action', () => {
		const state = fromJS({
			'1234': {
				name: 'Yoga class'
				,startTime: Moment('2016-05-14 9:00')
				,endTime: Moment('2016-05-14 12:00')
				,owner: 'Burning Fanny'
				,description: 'Yoga class for morning stretching'
				,location: 'Yogaholics Camp'
			}
		})
		const action = {
			type: REMOVE_EVENT
			,payload: {
				eventId: '1234'
			}
		}
		const nextState = eventReducer(state, action)

		expect(nextState).to.equal(Map())
	})
})