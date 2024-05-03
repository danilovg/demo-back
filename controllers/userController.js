const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models/models');


const generateJWT = (id, email, fullName, role) => {
  return jwt.sign({id, email, fullName, role}, process.env.SECRET_KEY, {expiresIn: '24h'});
}
class UserController {
  async registration(req, res, next) {
    const {email, login, password, fullName, phone} = req.body;
    if (!email || !login || !password || !fullName || !phone) {
      return next(ApiError.badRequest('Invalid description'))
    }
    const candidate = await User.findOne({where: {email}})
    if (candidate) {
      return next(ApiError.badRequest('Пользователь уже существует'))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ 
      email: email, 
      login: login, 
      password: hashPassword,
      fullName: fullName,
      phone: phone
    })
    const token = generateJWT(user.id, user.email, user.fullName, user.role);
    return res.json({token})
  }
  

  async login(req, res, next) {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}})
    if (!user) {
      return next(ApiError.badRequest('Пользователь не найден'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.badRequest('Неверный пароль'))
    }
    const token = generateJWT(user.id, user.email, user.fullName, user.role);
    return res.json({token})
  }

  async check(req, res, next) {
    const token = generateJWT(req.user.id, req.user.email, req.user.fullName, req.user.role);
    return res.json({token})
  }
}

module.exports = new UserController();