const express = require('express');
const router = express.Router();
const { Ing, Menu, User_Ing } = require('../models');

router.get('/all', (req, res)=>{
  Menu.findAll({
    attributes :['id','menu_name','menu_ing']
  })
  .then(data =>{
    res.status(200).json(data)
  })
});

router.get('/', (req, res)=>{
  User_Ing.findAll({
    where:{userId : 1},
    attributes :['ingredientId'],
    include : [Ing]
  }).then(data =>{
    let ingId =[]
    for(let i = 0; i <data.length; i++){
      ingId.push(data[i].ingredient.id)
    }
    return ingId
  }).then(ingId =>{
    let dataArr =[]
    for(let i = 0; i <ingId.length; i++){
      dataArr.push(Menu.findAll({
        where :{ingredientId : ingId[i]}
      }))
    }
    return dataArr
  }).then(data =>{
    let menuArr = []
    Promise.all(data)
    .then(data =>{
      for(let i = 0; i <data.length; i++){
        if(data[i].length !== 0){
          for(let j = 0; j <data[i].length; j++){
            let menuData ={}
            menuData.menu_name = data[i][j].dataValues.menu_name
            menuData.menu_ing = data[i][j].dataValues.menu_ing
            menuArr.push(menuData)
          }
        }
      }
      return menuArr
    }).then(data =>{
      res.status(200).json(data)
    }) 
  })
});

module.exports = router;