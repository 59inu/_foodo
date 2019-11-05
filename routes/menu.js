const express = require('express')
const router = express.Router()
const { Ing, Menu, User_Ing } = require('../models')
const auth = require('./auth')
const menuControl = require('./../controller/menus')

router.get('/all', menuControl.getAll)

router.get('/', menuControl.userMenu)

module.exports = router
