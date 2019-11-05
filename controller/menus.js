const express = require('express')
const { Ing, Menu, User_Ing } = require('../models')
const auth = require('./../routes/auth')

module.exports = {

  // 전체 메뉴 조회
  getAll: (req, res) => {
    Menu.findAll({
      attributes: ['id', 'menu_name', 'menu_ing']
    })
      .then(data => {
        res.status(200).json(data)
      })
  },

  // 유저별 추천 메뉴 조회
  userMenu: (req, res) => {
    auth(req, res, () => {
      User_Ing.findAll({
        where: { userId: req.decoded.userId },
        attributes: ['ingredientId'],
        include: [Ing]
      }).then(data => {
        const ingId = []
        for (let i = 0; i < data.length; i++) {
          ingId.push(data[i].ingredient.id)
        }
        return ingId
      }).then(ingId => {
        const dataArr = []
        for (let i = 0; i < ingId.length; i++) {
          dataArr.push(Menu.findAll({
            where: { ingredientId: ingId[i] }
          }))
        }
        return dataArr
      }).then(data => {
        const menuArr = []
        Promise.all(data)
          .then(data => {
            for (let i = 0; i < data.length; i++) {
              if (data[i].length !== 0) {
                for (let j = 0; j < data[i].length; j++) {
                  const menuData = {}
                  menuData.menu_name = data[i][j].dataValues.menu_name
                  menuData.menu_ing = data[i][j].dataValues.menu_ing
                  menuArr.push(menuData)
                }
              }
            }
            return menuArr
          }).then(data => {
            res.status(200).json(data)
          })
      })
    })
  }
}
