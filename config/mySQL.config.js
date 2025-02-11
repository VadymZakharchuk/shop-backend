module.exports = {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'node-shop',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}