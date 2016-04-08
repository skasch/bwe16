import {Map, fromJS} from 'immutable'
import Moment from 'moment'
import {expect} from 'chai'

import * as eventTypes from '../event/event_action_types'
import eventReducer from '../event/event_reducer'

describe('eventReducer', () => {
	it('handles GET_SUCCESS action', () => {
		const state = Map()
		const action = {
			type: eventTypes.GET_SUCCESS
			,payload: {
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
		const nextState = eventReducer(state, action)

		expect(nextState).to.equal(fromJS({
			data: {
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

	it('handles POST_SUCCESS action', () => {
		const state = Map()
		const action = {
			type: eventTypes.POST_SUCCESS
			,payload: {
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
		const nextState = eventReducer(state, action)

		expect(nextState).to.equal(fromJS({
			data: {
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

	it('handles UPDATE_SUCCESS action', () => {
		const state = Map()
		const action = {
			type: eventTypes.UPDATE_SUCCESS
			,payload: {
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
		const nextState = eventReducer(state, action)

		expect(nextState).to.equal(fromJS({
			data: {
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

	it('handles REMOVE_SUCCESS action', () => {
		const state = fromJS({
			data: {
				'1234': {
					name: 'Yoga class'
					,startTime: Moment('2016-05-14 9:00')
					,endTime: Moment('2016-05-14 12:00')
					,owner: 'Burning Fanny'
					,description: 'Yoga class for morning stretching'
					,location: 'Yogaholics Camp'
				}
			}	
		})
		const action = {
			type: eventTypes.REMOVE_SUCCESS
			,payload: '1234'
		}
		const nextState = eventReducer(state, action)

		expect(nextState).to.equal(Map())
	})
})