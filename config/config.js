/* eslint-disable spaced-comment */
//env.NODE_ENV = dev || production
//env.AWS_DB_HOST = ...
//설정하기(터미널)

const env = process.env.NODE_ENV

const dev = {
  app: {
    port: 4000
  },
  db: {
    host: 'localhost',
    user: 'root',
    password: ''
  }
}

const production = {
  app: {
    port: 4000
  },
  db: {
    host: process.env.AWS_DB_HOST,
    user: 'foodo',
    password: 'foodomaster'
  }
}

const config = {
  dev,
  production
}

module.exports = config[env]
