const express = require("express");
const multer = require("multer");
const uploadConfig = require('../config/multer');
const usersControllers = 
require('../controllers/usersControllers');

const authenticatedUser = require('../middlewares/authenticatedUser');
const upload = multer(uploadConfig);
const router = express.Router();

//const upload = multer({ dest: 'uploads/' });

router.get('/', usersControllers.findAll);
router.post('/', usersControllers.create);
router.get('/:id', usersControllers.findById);
router.put('/:id', authenticatedUser, usersControllers.edit);
router.delete('/:id', usersControllers.remove);
router.put('/:id/image', upload.single('image'), usersControllers.createImage);

module.exports = router;