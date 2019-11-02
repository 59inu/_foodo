const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { Ing, User_Ing } = require('../models');

const Op = Sequelize.Op;


//회원별 재고 목록 조회
router.get('/', (req, res)=>{
  let user_id = req.session.userId
  User_Ing.findAll({
    where:{userId : user_id},
    attributes :['ingredientId','exp','quantity','memo','frozen','createdAt','unit'],
    include : [Ing]
  })
  .then((data) =>{
    let result = [];
    for(let i = 0; i < data.length; i++){
      let ing ={}
      ing.name = data[i].ingredient.ing_name
      ing.put = data[i].createdAt
      ing.rest = data[i].exp
      ing.msg = 'hurry up'
      ing.userMemo = data[i].memo
      ing.frozen = data[i].frozen
      ing.quantity = data[i].quantity
      result.push(ing)
    }
    res.status(200).json(result)
  }).catch(err =>{
    res.status(400)
  }) 
});

//전체 재고 목록 조회
router.get('/all', (req, res)=>{
  Ing.findAll({
    attributes:['id','ing_name','category']
  })
  .then((data) =>{
    res.status(200).json(data)
  }).catch(err =>{
    res.status(400)
  })
});

//재고 검색 자동완성 
router.get('/:keyword', (req, res)=>{
  //req.params.keyword
  Ing.findAll({
    where : {
      ing_name :{
        [Op.like]: "%" + '고' + "%"
      }
    },
    attributes:['ing_name']
  }).then(data =>{
    res.status(200).json(data)
  }).catch(err =>{
    res.sendStatus(500)
  })
});

//회원별 재고 추가
router.post('/addItem', (req, res)=>{
  Ing.findOne({
    where :{
      ing_name : req.body.ing_name
    }
  })
  .then(result =>{
    let user_id = req.session.userId
    User_Ing.create({
      userId : user_id,
      ingredientId : result.id,
      exp : req.body.exp,
      quantity :req.body.quantity,
      memo :req.body.quantity,
      frozen : req.body.frozen,
      unit : req.body.unit
    })
  }) 
  .then((result) => {
    res.status(201).json(result)     
  })
  .catch(err => {
    res.sendStatus(500)              
  })
});

//회원별 재고량 수정
router.post('/quantity', (req, res)=>{
  Ing.findOne({
    where :{
      ing_name : req.body.ing_name
    }
  }).then(result =>{
    let user_id = req.session.userId
    return User_Ing.findOne({
      where :{
        userId : user_id,
        ingredientId : result.id
      }
    })
  })
  .then(project=>{
    if(project){
      project.update({
        quantity : req.body.quantity
      })
    }
  })
  .then((result) => {
    res.status(201).json(result)     
  })
  .catch(err => {
    res.sendStatus(500)              
  })
});

//회원별 재고량 삭제
router.post('/delete', (req, res)=>{
  Ing.findOne({
    where :{
      ing_name : req.body.ing_name
    }
  }).then(result =>{
    let user_id = req.session.userId
    return User_Ing.findOne({
      where :{
        userId : user_id,
        ingredientId : result.id
      }
    })
  })
  .then(project=>{
    User_Ing.destroy({
      where :{
        id : project.id
      }
    })
  })
  .then((result) => {
    res.status(201).json(result)     
  })
  .catch(err => {
    res.sendStatus(500)              
  })
});



module.exports = router;