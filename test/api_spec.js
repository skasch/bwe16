import {Map, List, fromJS} from 'immutable'
import Request from 'supertest'
import Moment from 'moment'
import {expect} from 'chai'

import setup from '../server/setup.js'
import { eventApi } from '../server/api'
import { get, remove } from '../server/event_service'
import app from '../server/app' 

describe('eventApi', () => {
	after(() => {
		get()
			.then((events) => events.keySeq().take(2).forEach(id => remove(id)))
	})

	it('handles get requests', done => {
		Request(app)
			.get('/api/event')
			.end((err, res) => {
				if (err) return done(err)
				expect(err).to.equal(null)
				expect(res.body).to.be.an('object')
				done()
			})
	})

	it('handles post requests', done => {
		const event =  fromJS({
			name: 'Yoga class'
			,startTime: Moment('2016-05-14 9:00')
			,endTime: Moment('2016-05-14 12:00')
			,owner: 'Burning Fanny'
			,description: 'Yoga class for morning stretching'
			,location: 'Yogaholics Camp'
		})
		Request(app)
			.post('/api/event')
			.send(event)
			.end((err, res) => {
				if (err) return done(err)
				expect(err).to.equal(null)
				expect(fromJS(res.body)
					.get(fromJS(res.body).keySeq().first())
					.remove('serverdate')
					.update('startTime', time => Moment(new Date(time)))
					.update('endTime', time => Moment(new Date(time)))).to.equal(event)
				done()
			})
	})

	it('handles update requests', done => {
		const event =  fromJS({
			name: 'Yoga class'
			,startTime: Moment('2016-05-14 9:00')
			,endTime: Moment('2016-05-14 12:00')
			,owner: 'Burning Fanny'
			,description: 'Yoga class for morning stretching'
			,location: 'Yogaholics Camp'
		})
		const eventUpdate = fromJS({
			name: 'Yoga beginner class'
			,startTime: Moment('2016-05-14 8:30')
			,description: 'Yoga class for every one!'
		})
		Request(app)
			.post('/api/event')
			.send(event)
			.end((err, res) => {
				if (err) return done(err)
				expect(err).to.equal(null)
				const id = fromJS(res.body).keySeq().first()
				const resEvent = fromJS(res.body).get(id).remove('serverdate')
				Request(app)
					.post(`/api/event/${id}`)
					.send(eventUpdate)
					.end((err, res) => {
						if (err) return done(err)
						expect(err).to.equal(null)
						expect(fromJS(res.body)
							.get(id)
							.remove('serverdate')
							.update('startTime', time => Moment(new Date(time))))
						.to.equal(resEvent.merge(eventUpdate))
						done()
					})
			})
	})

	it('handles remove requests', done => {
		const event =  fromJS({
			name: 'Yoga class'
			,startTime: Moment('2016-05-14 9:00')
			,endTime: Moment('2016-05-14 12:00')
			,owner: 'Burning Fanny'
			,description: 'Yoga class for morning stretching'
			,location: 'Yogaholics Camp'
		})
		Request(app)
			.post('/api/event')
			.send(event)
			.end((err, res) => {
				if (err) return done(err)
				expect(err).to.equal(null)
				const id = fromJS(res.body).keySeq().first()
				Request(app)
					.del(`/api/event/${id}`)
					.end((err, res) => {
						if (err) return done(err)
						expect(err).to.equal(null)
						expect(res.body).to.equal(id)
						done()
					})
			})
	})
})