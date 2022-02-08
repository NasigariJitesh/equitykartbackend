const nodemailer = require('nodemailer')
const env = require('./environment')


module.exports = nodemailer.createTransport(env.smtp)

