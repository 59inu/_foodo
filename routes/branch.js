const express = require('express')
const router = express.Router()
const { Branch, Post, Reply, Party, User} = require('../models')

// 지점 목록 
router.get('/all', (req, res) => {
  Branch.findAll({
    attributes: ['id', 'branch_name']
  })
    .then((data) => {
      res.status(200).json(data)
    }).catch(_err => {
      res.status(400)
    })
})

// 지점별 글 목록
router.get('/:id', (req, res) => {
  Post.findAll({
    where: { branchId : req.params.id },
    attributes: ['id', 'title', 'max', 'current'] // 2/5
  })
    .then((data) => {
      res.status(200).json(data)
    }).catch((err) => {
      res.status(400)
    })
})

// 지졈별 글 등록 //req.body{branchId:'', title:, content:, max:, }
router.post('/', (req, res) => {
  //let user_id = req.session.userId
  Post.create({
    title: req.body.title,
    content: req.body.content,
    max: req.body.max,
    current: 0,
    branchId: req.body.branchId,
    userId: 1
  })
    .then((data) => {
      res.status(200).json(data)
    }).catch((err) => {
      res.status(400)
    })
})


//글 내용// req.body{postId:}
router.get('/post/:postId', (req, res) => {
  console.log(req.params.postId)
  let postData = {
    reply: []
  }
  Post.findOne({
    where: { id: req.params.postId },
    attributes: ['id', 'title', 'content', 'max', 'current'],
    include:[User, Reply] // 2/5
  })
  .then( data=> {
    postData.title = data.title,
    postData.content = data.content,
    postData.max = data.max,
    postData.current = data.current
    postData.userName = data.user.userName
  })
  .then(()=>{
    return Reply.findAll({
      where: { postId : req.params.postId },
      include: [User]
    })
  })
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      let data = data[i].dataValues
      let reply = {
        id: data.id,
        name: data.user.userName,
        content: data.content
      }
      postData.reply.push()
    }
    return data
  })
  .then((data) => {
    res.status(200).json(data)
  })
  .catch((err) => {
    res.status(400)
  })
})


//참여버튼 눌렀을때 참여 값

//댓글 달기



module.exports = router;
