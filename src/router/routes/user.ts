import { Router } from 'express';
import router from '.';
import auth from '../../middlewares/auth';
import userController from '../../controllers/user';
import { avatar } from '../../middlewares/upload';
import { prevalidate, validateUser } from '../../middlewares/validation';
import { uploadError } from '../../middlewares/error';

export default (path: string, apiRouter: Router): void => {
  const route = router(path, apiRouter);


  /** Route definitions */
  route.post('/signup', prevalidate, validateUser, userController.signupUser);
  route.post('/login', userController.loginUser);
  route.get('/logout', auth, userController.logoutCurrentSession);
  route.get('/logout/all', auth, userController.logoutAllSessions);
  route.get('/verify/:verificationToken', userController.verifyUser);
  route.get('/profile', auth, userController.getProfile);
  route.delete('/profile', auth, userController.deleteProfile);
  route.delete('/profile/avatar', auth, userController.deleteAvatar);
  route.get('/:id', userController.getUser);
  route.get('/:id/send-verification', userController.sendVerification);
  route.get('/:id/avatar.png', userController.getAvatar);

  route.put(
    '/profile',
    auth,
    prevalidate,
    validateUser,
    userController.updateProfile
  );

  route.post(
    '/profile/avatar',
    auth,
    avatar,
    uploadError,
    userController.uploadAvatar
  );
};
