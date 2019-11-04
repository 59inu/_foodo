const express = require('express')
const router = express.Router()
const crypto = require('crypto')
var { User } = require('./../models')

const salt = "secondpreference'sfirstproject"
const jwt = require('jsonwebtoken')
const secretObj = require('../config/jwt')

router.get('/', (req, res) => {
  User.findAll({
    attributes: ['email', 'userName', 'createdAt']
  })
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(500).send(err)
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
    .catch(err => {
      res.status(500).send(err)
    })
})

router.post('/signin', (req, res) => {
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
      console.log('로그인요청')
      if (result) {
        let token = jwt.sign({
          email: req.body.email,
          userId: result.dataValues.id
        },
        secretObj.secret,
        {
          expiresIn: '5m'
        })
        res.cookie('user', token)
        res.json({
          token: token
        })
      } else {
        res.send('login failed')
      }
    })
    .catch(err => {
      res.status(500).send(err)
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
        console.log(req.body)
        User.create({
          email: req.body.email,
          password: crypto.createHmac('sha512', salt)
            .update(req.body.password)
            .digest('hex'),
          userName: req.body.userName
        })
          .then(result => {
            res.status(201).json(result)
          })
          .catch(err => {
            res.status(500).send(err)
          })
      } else if (result) {
        res.send('email already exists!')
      }
    })
    .catch(err => {
      res.status(500).send(err)
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
