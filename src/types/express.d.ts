declare namespace Express {
  interface Request {
    currentUser: import('../models/user/type').IUser;
    authToken: string;
  }
}
