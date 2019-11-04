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
    host: 'foodo.cyx2csl3obmx.us-east-2.rds.amazonaws.com',
    user: 'foodo',
    password: 'foodomaster'
  }
}

const config = {
  dev,
  production
}

module.exports = config[env]
