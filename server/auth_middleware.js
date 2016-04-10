export default function(req, res, next) {
  if (req.isAuthenticated())
    next()
  else if (req.url.includes('/api'))
    res.status(401).send('Unauthorized request')
  else
    res.status(302).redirect('/login')
}