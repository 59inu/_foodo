const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const { Ing, User_Ing } = require('../models')

const Op = Sequelize.Op
const ingControl = require('./../controller/ingredients')

// 회원별 재고 목록 조회
router.get('/', ingControl.userIng)

// 전체 재고 목록 조회
router.get('/all', ingControl.userIngAll)

// 재고 검색 자동완성
router.get('/:keyword', ingControl.search)

// 회원별 재고 추가
router.post('/addItem', ingControl.addItem)

// 회원별 재고량 수정
router.post('/quantity', ingControl.modifyQuantity)

// 회원별 재고량 삭제
router.post('/delete', ingControl.deleteItem)

module.exports = router
