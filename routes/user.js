const express = require('express')
const router = express.Router()

const userControl = require('./../controller/users')

router.get('/', userControl.getAllUser)

router.get('/:id', userControl.getUser)

router.post('/signin', userControl.signIn)

router.post('/signup', userControl.signUp)

router.post('/signout', userControl.signOut)

module.exports = router
