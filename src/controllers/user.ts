import { Request, Response, NextFunction } from 'express';

/** Route controller responsible for service invocation. */
class UserController {
  getUser = async (
    { params }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {};

  signupUser = async (
    { body }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {};

  loginUser = async (
    { body }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {};

  verifyUser = async (
    { params }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {};

  sendVerification = async (
    { params }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {};

  logoutCurrentSession = async (
    { currentUser, authToken }: Request,
    res: Response,
    next: NextFunction
  ) => {};

  logoutAllSessions = async (
    { currentUser }: Request,
    res: Response,
    next: NextFunction
  ) => {};

  getProfile = ({ currentUser }: Request, res: Response) => {};

  updateProfile = async (
    { currentUser, body }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {};

  deleteProfile = async (
    { currentUser }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {};
}

export default new UserController();
