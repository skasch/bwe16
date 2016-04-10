import {Map, fromJS} from 'immutable'
import Moment from 'moment'
import {expect} from 'chai'

import setup from '../server/setup.js'
import { 
	get
	,post
	,update
	,remove 
} from '../event/event_service'


describe('eventService', () => {
	before(setup)

	after(() => {
		get()
			.then((events) => events.keySeq().take(2).forEach(id => remove(id)))
	})
	
	it('gets data from the database', () => {
		expect(get).to.not.throw(Error)
	})

	it('posts an event to the database', () => {
		const event = fromJS({
			name: 'Yoga class'
			,startTime: Moment('2016-05-14 9:00')
			,endTime: Moment('2016-05-14 12:00')
			,owner: 'Burning Fanny'
			,description: 'Yoga class for morning stretching'
			,location: 'Yogaholics Camp'
		})
		const resPost = post(event)
		const id = resPost
			.then(table => table.keySeq().first())
		const res = resPost
			.then(table => table
				.get(table.keySeq().first())
				.delete('serverdate')
			)
		const resEvent = res
			.then(table => table
				.update('startTime', time => Moment(new Date(time)))
				.update('endTime', time => Moment(new Date(time)))
			)
		const lastEvent = id
			.then(id => get()
				.then(table => table
					.get(id)
					.delete('serverdate')))

		return Promise.all([
			expect(resEvent).to.eventually.equal(event)
			,expect(lastEvent).to.eventually.equal(res)
		])
	})

	it('updates an event in the database', () => {
		const event = fromJS({
			name: 'Yoga class'
			,startTime: Moment('2016-05-14 9:00')
			,endTime: Moment('2016-05-14 12:00')
			,owner: 'Burning Fanny'
			,description: 'Yoga class for morning stretching'
			,location: 'Yogaholics Camp'
		})
		const res = post(event)
			.then(table => table.keySeq().first())
			.then(id => update(id, eventUpdate))
			.then(table => {
				return table
				.get(table.keySeq().first())
				.delete('serverdate')
				.update('startTime', time => Moment(new Date(time)))
				.update('endTime', time => Moment(new Date(time)))
			})
		const eventUpdate = fromJS({
			name: 'Yoga beginner class'
			,startTime: Moment('2016-05-14 8:30')
			,description: 'Yoga class for every one!'
		})

		return expect(res).to.eventually.equal(fromJS({
			name: 'Yoga beginner class'
			,startTime: Moment('2016-05-14 8:30')
			,endTime: Moment('2016-05-14 12:00')
			,owner: 'Burning Fanny'
			,description: 'Yoga class for every one!'
			,location: 'Yogaholics Camp'
		}))
	})

	it('deletes an event from the database', () => {
		const event = fromJS({
			name: 'Yoga class'
			,startTime: Moment('2016-05-14 9:00')
			,endTime: Moment('2016-05-14 12:00')
			,owner: 'Burning Fanny'
			,description: 'Yoga class for morning stretching'
			,location: 'Yogaholics Camp'
		})
		const id = post(event)
			.then(table => table.keySeq().first())
		const res = id
			.then(id => remove(id))
		return expect(res).to.eventually.equal(id)
	})
})