const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const saucesCtrl = require('../controllers/sauces');
// route post
router.post('/', auth, multer, saucesCtrl.createThing);
// route get  
router.get('/', auth, saucesCtrl.getAllThing);
//   route avec id
router.get('/:id', auth, saucesCtrl.getOneThing);
//   route put
router.put('/:id', auth, multer, saucesCtrl.modifyThing);
//   route delete
router.delete('/:id', auth, multer, saucesCtrl.deleteThing);
// route like dislike
router.post('/:id/like', auth, saucesCtrl.likeDislikeSauce);


module.exports = router;  