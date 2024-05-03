const Router = require('express');
const router = new Router();
const statementRouter = require('./statementRouter');
const userRouter = require('./userRouter');
const adminRouter = require('./adminRouter');

router.use('/user', userRouter)
router.use('/statement', statementRouter)
router.use('/admin', adminRouter)

module.exports = router