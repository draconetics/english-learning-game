const router = require('express-promise-router')();

// const { index, newUser, getUser, replaceUser, deleteUser, getUserCars, newUserCar } = require('../controllers/product');
const { index, newWord} = require('../controllers/word');

router.get('/', index);
router.post('/', newWord);

/* router.get('/:userId', getUser);
router.put('/:userId', replaceUser);
router.delete('/:userId', deleteUser);
router.get('/:userId/cars', getUserCars);
router.post('/:userId/cars', newUserCar) */

module.exports = router;