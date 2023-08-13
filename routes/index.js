// userRouter.js
const express = require('express');
const router = express.Router();
const homeController=require('../controllers/home_controllers');

console.log('router loaded');

router.get('/', homeController.home);
router.use('/user', require('./user'));

// for any further routes, access from here
// router.use('/routeName', require('./routerFile'));


// router.get('/actionName', homeController.actionName);

module.exports = router;