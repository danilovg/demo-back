const ApiError = require('../error/ApiError');
const {Statement, User} = require('../models/models');

class StatementController {

  async create(req, res, next) {
    const { description, carNumber } = req.body;
    if (!description || !carNumber ) {
      return next(ApiError.badRequest('Invalid description'))
    }
    const statement = await Statement.create({
      description,
      carNumber,
      status: 'новое',
      userId: req.user.id
    });
    res.status(201).json(statement);
  }

  async getAllUser(req, res) {
    const userId = req.user.id;
    try {
      const statements = await Statement.findAll({ where: { userId } });

      res.status(200).json(statements);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user reports", error: error.message });
    }
  }

  async getAll(req, res) {
    const statements = await Statement.findAll();
    res.status(200).json(statements);
  }

  async getById(req, res) {
    const { id } = req.params;
    const statement = await Statement.findByPk(id);
    if (!statement) {
      return next(ApiError.notFound('Заявление не найдено'));
    }
    res.status(200).json(statement);
  }

  async update(req, res) {
    const { id } = req.params;
    const { status } = req.body; 
    const statement = await Statement.findByPk(id);
    if (!statement) {
      return next(ApiError.badRequest('Нет такого заявленияв'))
    }
    statement.status = status;
    await statement.save();
    res.status(201).json({ message: "Статус был изменен", report });
  }
}

module.exports = new StatementController();