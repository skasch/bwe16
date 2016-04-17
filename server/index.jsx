import React from 'react'
import { Map } from 'immutable'
import match from 'react-router/lib/match'
import makeStore from '../flux/store'
import routes from '../App/routes'
import { getEvent } from '../event/event'
import { authUser } from '../user/user_action_creators'

export default function initialRender(req, res) {
	const store = makeStore()

  if (Map.isMap(req.user) && req.user.keySeq().first())
  	store.dispatch(authUser(req.user))

	match({ 
		routes
		,location: req.url
	}, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message)
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {
      res.status(200).send(renderTemplate(store.getState()))
		} else {
			res.status(404).send('Not found')
		}
	})
}

function renderTemplate(initialState) {
	return `
	<!DOCTYPE html>
  <html>
    <head>
    	<meta name="viewport" content="width=device-width, initial-scale=1">
    	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.0/css/font-awesome.min.css">
			<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
			<style>
				body {
					margin: 0;
					background-color: #eee;
				}
			</style>
			<title>Burning weekend 2016</title>
    </head>
    <body>
      <div id="app"></div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
      <script src="bundle.js"></script>
    </body>
  </html>
	`
} 