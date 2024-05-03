const Router = require('express');
const router = new Router();
const statementController = require('../controllers/statementController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/', checkRole('ADMIN'), statementController.getAll);
router.put('/:id/status', checkRole('ADMIN'), statementController.update);


module.exports = router