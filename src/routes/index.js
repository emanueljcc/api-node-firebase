const { Router } = require('express');
const router = Router();
const { getAll, add, remove } = require('../controllers/UserControllers');
const validator = require('../utils/validator');

router.get('/user', getAll);
router.post('/user', validator.add, add);
router.delete('/user/:id', validator.id, remove);

module.exports = router;
