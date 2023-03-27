import logger from '../../utils/winston.js'
import User from './userModel.js'
import {signUpEmail} from '../../utils/email.js'

export async function signUp(req, res) {
  const newUser = new User(req.body);
  newUser.photo = req.file.filename;
  newUser.cart = []
  signUpEmail(newUser)
  try {
    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    logger.error(`Error al registrar usuario. ${error}`);
  }
}