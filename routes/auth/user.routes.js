const express = require('express');
const router = express.Router();

const userController = require('../../controllers/auth/user.controller');

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);

module.exports = router;