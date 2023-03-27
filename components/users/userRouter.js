import {Router} from 'express';
import passport from 'passport';
import isRegistered from './utils/isRegistered.js';
import {signUp } from './userController.js'
import multer from './utils/multer.js'
import { isAuth, isNotAuth} from '../../utils/Auth.js'

const userRouter = new Router();

userRouter.post('/signup', multer.single('photo'), isRegistered, signUp)

userRouter.post(
       '/login',
       passport.authenticate('local', {
         failureRedirect: '/login-error',
         successRedirect: '/',
       })
     );

userRouter.get('/signup', isNotAuth, (req, res)  =>{
    res.render('signup');
});

userRouter.get('/login', isNotAuth, (req, res)  =>{
    res.render('login')
});

userRouter.get('/profile', isAuth, (req, res)  =>{
    const user = req.user;
    res.render('profile', {user})
});

userRouter.get('/login-error', isNotAuth, (req, res)  =>{
    res.render('login-error')
});

userRouter.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.render('logout');
  });

export default userRouter