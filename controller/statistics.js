const express = require('express')
const { Ing, User_Ing } = require('../models')
const auth = require('./../routes/auth')

module.exports = {
  getBestIng: (req, res) => {
    const result = []

    //통계 기간
    var startDStr = ''
    var startDate = new Date()
    startDate.setMonth(new Date().getMonth())
    var monthStr = String(startDate.getUTCMonth()).length < 2 ? '0' + startDate.getUTCMonth() : startDate.getUTCMonth()
    var dayStr = String(startDate.getUTCDate()).length < 2 ? '0' + startDate.getUTCDate() : startDate.getUTCDate()
    startDStr = startDate.getUTCFullYear() + '-' + monthStr + '-' + dayStr


    auth(req, res, () => {
      User_Ing.findAll({
        where: { userId: req.decoded.userId },
        attributes: ['ingredientId', 'count', 'deleted'],
        include: [Ing]
      })
        .then(data => {
          var record = {}
          data.forEach(el => {
            record.name = el.ingredients.ing_name
            record.count = el.count
            record.deleted = el.deleted
            result.push(record)
          })
        })
    })
  }

}
