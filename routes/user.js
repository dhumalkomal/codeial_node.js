const express= require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controllers');

router.get('/profile', passport.checkAuthentication, usersController.profile);
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/signIn', usersController.signIn);
router.get('/signUp', usersController.signUp);

router.post('/create', usersController.create);
// router.post('/createSession', usersController.createSession);


router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect:'/user/signIn'}
), usersController.createSession);


router.get('/signOut', usersController.destroySession);


module.exports=router;