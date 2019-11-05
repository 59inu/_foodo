const express = require('express')
const crypto = require('crypto')
var { User } = require('./../models')

const salt = "secondpreference'sfirstproject"
const jwt = require('jsonwebtoken')
const secretObj = require('../config/jwt')

module.exports = {

  // 전체 회원 조회
  getAllUser: (req, res) => {
    User.findAll({
      attributes: ['email', 'userName', 'createdAt']
    })
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  },

  // ID별 유저 조회
  getUser: (req, res) => {
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
  },

  // 로그인
  signIn: (req, res) => {
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
          const token = jwt.sign({
            email: req.body.email,
            userId: result.dataValues.id
          },
          secretObj.secret,
          {
            expiresIn: '30m'
          })
          res.cookie('user', token)// {secure: true, httpOnly: true }
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
  },

  // 회원 가입
  signUp: (req, res) => {
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
  },

  // 로그 아웃
  signOut: (req, res) => {
    res.send('bye')
  }
}
