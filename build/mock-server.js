var path = require('path')
var express = require('express')
var jsonServer = require('json-server')

var router = jsonServer.router(path.resolve(__dirname, '../mock/db.json'))
var middlewares = jsonServer.defaults()

var server = express()

server.use(middlewares)

server.post('/api/users/signin', function (req, res) {
  res.json({
    user: {
      username: 'test',
    },
    accessToken: '233'
  })
})

server.post('/api/users/signup', function (req, res) {
  res.end()
})

server.use(function (req, res, next) {
  if (req.header('Authorization') === '233') {
    next()
  } else {
    res.status(401).end()
  }
})

server.use('/api', router)

server.listen(8081, function () {
  console.log('JSON server is listen on localhost:8081')
})
