import {List, Map, fromJS} from 'immutable'
import Moment from 'moment'
import {expect} from 'chai'

import {createEvent, removeEvent, editEvent} from '../event/event'

describe('event logic', () => {
	it('adds a new event to the state', () => {
		const events = Map()
		const eventContent = fromJS({
			name: 'Yoga class'
			,startTime: Moment('2016-05-14 9:00')
			,endTime: Moment('2016-05-14 12:00')
			,owner: 'Burning Fanny'
			,description: 'Yoga class for morning stretching'
			,location: 'Yogaholics Camp'
		})
		const eventId = '1234'
		const nextState = createEvent(events, eventId, eventContent)

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

	it('creates an events key if it does not exist', () => {
		const events = Map()
		const eventContent = fromJS({
			name: 'Yoga class'
			,startTime: Moment('2016-05-14 9:00')
			,endTime: Moment('2016-05-14 12:00')
			,owner: 'Burning Fanny'
			,description: 'Yoga class for morning stretching'
			,location: 'Yogaholics Camp'
		})
		const eventId = '1234'
		const nextState = createEvent(events, eventId, eventContent)

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

	it('replaces existing event if same id', () => {
		const events = fromJS({
			'1234': {
				name: 'Yoga class'
				,startTime: Moment('2016-05-14 9:00')
				,endTime: Moment('2016-05-14 12:00')
				,owner: 'Burning Fanny'
				,description: 'Yoga class for morning stretching'
				,location: 'Yogaholics Camp'
			}
			,'4321': {
				name: 'Napping lesson'
				,startTime: Moment('2016-05-13 15:00')
				,endTime: Moment('2016-05-13 17:00')
				,owner: 'Sleppy Doge'
				,description: 'Time to sleep! I hope you are zzzzzz'
				,location: 'Snorting Smurfs'
			}
		})
		const eventId = '1234'
		const eventContent = fromJS({
			name: 'Yoga beginner class'
			,startTime: Moment('2016-05-14 8:30')
			,endTime: Moment('2016-05-14 12:00')
			,owner: 'Burning Fanny'
			,description: 'Yoga class for every one!'
			,location: 'Yogaholics Camp'
		})
		const nextState = createEvent(events, eventId, eventContent)

		expect(nextState).to.equal(fromJS({
			'1234': {
				name: 'Yoga beginner class'
				,startTime: Moment('2016-05-14 8:30')
				,endTime: Moment('2016-05-14 12:00')
				,owner: 'Burning Fanny'
				,description: 'Yoga class for every one!'
				,location: 'Yogaholics Camp'
			}
			,'4321': {
				name: 'Napping lesson'
				,startTime: Moment('2016-05-13 15:00')
				,endTime: Moment('2016-05-13 17:00')
				,owner: 'Sleppy Doge'
				,description: 'Time to sleep! I hope you are zzzzzz'
				,location: 'Snorting Smurfs'
			}
		}))
	})

	it('deletes an event', () => {
		const events = fromJS({
			'1234': {
				name: 'Yoga class'
				,startTime: Moment('2016-05-14 9:00')
				,endTime: Moment('2016-05-14 12:00')
				,owner: 'Burning Fanny'
				,description: 'Yoga class for morning stretching'
				,location: 'Yogaholics Camp'
			}
			,'4321': {
				name: 'Napping lesson'
				,startTime: Moment('2016-05-13 15:00')
				,endTime: Moment('2016-05-13 17:00')
				,owner: 'Sleppy Doge'
				,description: 'Time to sleep! I hope you are zzzzzz'
				,location: 'Snorting Smurfs'
			}
		})
		const eventId = '1234'
		const nextState = removeEvent(events, eventId)

		expect(nextState).to.equal(fromJS({
			'4321': {
				name: 'Napping lesson'
				,startTime: Moment('2016-05-13 15:00')
				,endTime: Moment('2016-05-13 17:00')
				,owner: 'Sleppy Doge'
				,description: 'Time to sleep! I hope you are zzzzzz'
				,location: 'Snorting Smurfs'
			}
		}))
	})

	it('edits an event', () => {
		const events = fromJS({
			'1234': {
				name: 'Yoga class'
				,startTime: Moment('2016-05-14 9:00')
				,endTime: Moment('2016-05-14 12:00')
				,owner: 'Burning Fanny'
				,description: 'Yoga class for morning stretching'
				,location: 'Yogaholics Camp'
			}
			,'4321': {
				name: 'Napping lesson'
				,startTime: Moment('2016-05-13 15:00')
				,endTime: Moment('2016-05-13 17:00')
				,owner: 'Sleppy Doge'
				,description: 'Time to sleep! I hope you are zzzzzz'
				,location: 'Snorting Smurfs'
			}
		})
		const eventId = '1234'
		const eventContent = fromJS({
			name: 'Yoga beginner class'
			,startTime: Moment('2016-05-14 8:30')
			,description: 'Yoga class for every one!'
		})
		const nextState = editEvent(events, eventId, eventContent)

		expect(nextState).to.equal(fromJS({
			'1234': {
				name: 'Yoga beginner class'
				,startTime: Moment('2016-05-14 8:30')
				,endTime: Moment('2016-05-14 12:00')
				,owner: 'Burning Fanny'
				,description: 'Yoga class for every one!'
				,location: 'Yogaholics Camp'
			}
			,'4321': {
				name: 'Napping lesson'
				,startTime: Moment('2016-05-13 15:00')
				,endTime: Moment('2016-05-13 17:00')
				,owner: 'Sleppy Doge'
				,description: 'Time to sleep! I hope you are zzzzzz'
				,location: 'Snorting Smurfs'
			}
		}))
	})
})