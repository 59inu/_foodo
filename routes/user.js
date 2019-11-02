const express = require('express')
const router = express.Router()
const crypto = require('crypto')
var { User } = require('./../models')

const salt = "secondpreference'sfirstproject"

router.get('/', (req, res) => {
  User.findAll({
    attributes: ['email', 'userName', 'createdAt']
  })
    .then(result => {
      res.send(result)
    })
})

router.get('/:id', (req, res) => {
  console.log(req.params.id)
  User.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['email', 'userName', 'createdAt']
  })
    .then(data => {
      if (data) {
        const info = {
          email: data.email,
          userName: data.userName,
          createdAt: data.createdAt
        }
        res.json(info)
      } else {
        res.send('invalid user')
      }
    })
})

router.post('/signin', (req, res) => {
  const userSession = req.session
  User
    .findOne({
      where: {
        email: req.body.email,
        password: crypto.createHmac('sha512', salt)
          .update(req.body.password)
          .digest('hex')
      }
    })
    .then((result) => {
      if (result) {
        userSession.userId = result.dataValues.userName
      }
      console.dir(userSession.userId)
      return userSession.userId
    })
    .then(result => {
      if (result) {
        res.send(`login secceed, ${userSession.userId}`)
      } else {
        res.send('login failed')
      }
    })
})

router.post('/signup', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((result) => {
      if (!result) {
        User.create({
          email: req.body.email,
          password: crypto.createHmac('sha512', salt)
            .update(req.body.password)
            .digest('hex'),
          userName: req.body.userName
        })
          .then(result => {
            res.status(201).send(result)
          })
          .catch(err => {
            res.status(500).send(err)
          })
      } else if (result) {
        res.send('email already exists!')
      }
    })
})

router.post('/signout', (req, res) => {
  console.log('logout')
  console.log(req.session.userId)
  if (req.session.userId) {
    req.session.destroy(err => {
      if (err) { console.log(err) } else { res.send('bye') }
    })
  }
})

module.exports = router
