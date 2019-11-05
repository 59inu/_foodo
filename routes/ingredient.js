const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const { Ing, User_Ing } = require('../models')

const Op = Sequelize.Op
const auth = require('./auth')

// 회원별 재고 목록 조회
router.get('/', (req, res) => {
  auth(req, res, () => {
    User_Ing.findAll({
      where: { userId: req.decoded.userId },
      attributes: ['id', 'ingredientId', 'exp', 'quantity', 'memo', 'frozen', 'createdAt', 'unit'],
      include: [Ing]
    })
      .then((data) => {
        const result = []
        const rest = function (exp) {
          var today = new Date()
          var dateString = exp
          var dateArray = dateString.split('-')
          var dateObj = new Date(dateArray[0], Number(dateArray[1]) - 1, dateArray[2])
          var restDay = Math.ceil((dateObj.getTime() - today.getTime()) / 1000 / 60 / 60 / 24)
          return restDay
        }

        const message = function (rest) {
          console.log(rest)
          if (rest < 0) {
            return 'No Eat'
          } else if (rest <= 2) {
            return 'hurry Eat'
          } else {
            return 'fresh!'
          }
        }

        for (let i = 0; i < data.length; i++) {
          if (data[i].deleted === 0) {
            const ing = {}
            var restDay = rest(data[i].exp)
            ing.id = data[i].id
            ing.name = data[i].ingredient.ing_name
            ing.put = data[i].createdAt
            ing.rest = restDay
            ing.msg = message(restDay)
            ing.userMemo = data[i].memo
            ing.frozen = data[i].frozen
            ing.quantity = data[i].quantity
            ing.unit = data[i].unit
            ing.entryQ = data[i].entryQ
            result.push(ing)
          }
        }
        res.status(200).json(result)
      }).catch(err => {
        res.status(400)
      })
  })
})

// 전체 재고 목록 조회
router.get('/all', (req, res) => {
  Ing.findAll({
    attributes: ['id', 'ing_name', 'category']
  })
    .then((data) => {
      res.status(200).json(data)
    }).catch(err => {
      res.status(400)
    })
})

// 재고 검색 자동완성
router.get('/:keyword', (req, res) => {
  // req.params.keyword
  Ing.findAll({
    where: {
      ing_name: {
        [Op.like]: '%' + '고' + '%'
      }
    },
    attributes: ['ing_name']
  }).then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.sendStatus(500)
  })
})

// 회원별 재고 추가
router.post('/addItem', (req, res) => {
  auth(req, res, () => {
    Ing.findOne({
      where: {
        ing_name: req.body.ing_name
      }
    })
      .then(result => {
        User_Ing.create({
          userId: req.decoded.userId,
          ingredientId: result.id,
          exp: req.body.exp, // 날짜
          quantity: req.body.quantity,
          memo: req.body.quantity,
          frozen: req.body.frozen,
          unit: req.body.unit,
          entryQ: req.body.quantity,
          deleted: 0
        })
      })
      .then((result) => {
        res.status(201).json(result)
      })
      .catch(err => {
        res.sendStatus(500)
      })
  })
})

// 회원별 재고량 수정
router.post('/quantity', (req, res) => {
 auth(req, res, () => {
    Ing.findOne({
      where: {
        ing_name: req.body.ing_name
      }
    }).then(result => {
      console.log(result.id)
      const user_id = req.decoded.userId
      return User_Ing.findOne({
        where: {
          userId: user_id,
          ingredientId: result.id
        }
      }) 
    })
      .then(project => {
        if (project) {
          project.update({
            quantity: req.body.quantity,
            count: project.count+1
          })
        }
      })
      .then((result) => {
        res.status(201).json(result)
      })
      .catch(err => {
        res.sendStatus(500)
      })
  })
})

// 회원별 재고량 삭제
router.post('/delete', (req, res) => {
  auth(req, res, () => {
    Ing.findOne({
      where: {
        ing_name: req.body.ing_name
      }
    }).then(result => {
      const user_id = req.decoded.userId
      return User_Ing.findOne({
        where: {
          userId: user_id,
          ingredientId: result.id
        }
      })
    })
      .then(project => {
        if (req.body.msg === 'No Eat') {
          project.update({
            where: {
              deleted: 2
            }
          })
        } else {
          project.update({
            where: {
              deleted: 1
            }
          })
        }
      })
      .then((result) => {
        res.status(201).json(result)
      })
      .catch(err => {
        res.sendStatus(500)
      })
  })
})

module.exports = router
