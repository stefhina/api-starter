import { Document } from 'mongoose';
import { Express } from 'express';
import { IUser } from '../models/user/type';

class UserService {
  createUser = async (data: Document) => {};

  getUser = async (id: string) => {};

  updateUser = async (user: IUser, newData: Record<string, any>) => {};

  getVerificationForUser = async (id: string) => {};

  sendWelcomeMail = async (
    to: string,
    name: string,
    verificationToken: string
  ) => {};

  loginUser = async (email: string, password: string) => {};

  logoutCurrentSession = async (user: IUser, authToken: string) => {};

  logoutAllSessions = async (user: IUser) => {};

  uploadAvatar = async (user: IUser, file: Express.Multer.File) => {};

  getAvatar = async (id: string) => {};

  deleteAvatar = async (user: IUser) => {};
}

export default new UserService();
