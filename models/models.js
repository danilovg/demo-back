const sequelize = require('../db');
const {DataTypes} = require('sequelize'); 

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  login: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  fullName: {type: DataTypes.STRING},
  phone: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Statement = sequelize.define('statement', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  description: {type: DataTypes.TEXT},
  carNumber: {type: DataTypes.STRING},
  status: {type: DataTypes.ENUM('новое', 'подтверждено', 'отклонено')},
  userId: {type: DataTypes.INTEGER}
});

User.hasMany(Statement);
Statement.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Statement
}