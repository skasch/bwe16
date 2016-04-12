import { fromJS } from 'immutable'
import { Strategy } from 'passport-local'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import {
	intoSession
	,outOfSession
	,localAuthCallback
	,post
}
from '../user/user_service'
import * as keys from './keys.js'

const local = new Strategy({ usernameField: 'email' }, localAuthCallback)

const facebook = new FacebookStrategy({
	clientID: keys.facebook.clientID
	,clientSecret: keys.facebook.clientSecret
	,callbackURL: keys.facebook.callbackURL
  ,profileFields: ['id', 'displayName', 'email']
}, (accessToken = '', refreshToken = '', profile, done) => {
	console.log(profile)
	post(fromJS({
		email: profile.email || ''
		,name: profile.displayName || ''
		,auth: {
			id: profile.id || ''
			,type: 'facebook'
			,accessToken
			,refreshToken
		}
	}))
		.then(user => {
			if (user.get('err'))
				done(null, fromJS(user), { message: user.get('err')})
			else 
				done(null, fromJS(user), { message: 'Account created with Facebook '})
		})
})

export default function(passport) {
	passport.serializeUser(intoSession)
	passport.deserializeUser(outOfSession)

	passport.use(local)
	passport.use(facebook)
}