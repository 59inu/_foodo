const jwt = require('jsonwebtoken')
const secretObj = require('../config/jwt')

const authCheck = (req, res, next) => {
  const token = req.cookies.user
  console.log(token)
  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'login failed'
    })
  }

  const p = new Promise((resolve, reject) => {
    jwt.verify(token, secretObj.secret, (err, decoded) => {
      if (err) reject(err)
      resolve(decoded)
    })
  })

  const e = (error) => {
    res.status(403).json({
      success: false,
      message: error.message
    })
  }

  p.then((decoded) => {
    req.decoded = decoded
    next()
  })
    .catch(e)
}

module.exports = authCheck
