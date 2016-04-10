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
}, (accessToken = '', refreshToken = '', profile, done) => {
	post(fromJS({
		email: profile.email || ''
		,name: {
			displayName: profile.displayName || ''
			,familyName: profile.name.familyName || ''
			,givenName: profile.name.givenName || ''
		}
		,auth: {
			id: profile.id || ''
			,type: 'facebook'
			,accessToken
			,refreshToken
		}
		,gender: profile.gender || ''
		,picture: profile.profileUrl || ''
	}))
		.then(user => {
			if (user.get('err'))
				done(null, user, { message: user.get('err')})
			else 
				done(null, user, { message: 'Account created with Facebook '})
		})
})

export default function(passport) {
	passport.serializeUser(intoSession)
	passport.deserializeUser(outOfSession)

	passport.use(local)
	passport.use(facebook)
}