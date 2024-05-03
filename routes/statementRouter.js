const Router = require('express');
const router = new Router();
const statementController = require('../controllers/statementController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, statementController.create)
router.get('/', authMiddleware, statementController.getAllUser)
router.get('/:id', authMiddleware, statementController.getById)

module.exports = router