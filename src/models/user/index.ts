import { model, Schema } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import config from '../../app/config';
import { IUser, IUserDocument, IUserModel } from './type';

const jwtSecret = config('JWT_SECRET');

const userSchema = new Schema<IUserDocument>(
  {
    firstname: {
      type: String,
    },
    middlename: {
      type: String,
      default: '',
    },
    lastname: {
      type: String,
    },
    age: {
      type: Number,
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    avatar: {
      type: Buffer,
    },
    verificationToken: {
      type: String,
    },
    authTokens: [
      {
        authToken: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function (): Record<string, any> {
  const { _id, firstname, middlename, lastname, age, username, email } = this;

  return { _id, firstname, middlename, lastname, age, username, email };
};

userSchema.methods.getAuthToken = async function (): Promise<string> {
  const authToken = jwt.sign(
    {
      _id: this._id.toString(),
    },
    jwtSecret,
    { expiresIn: '1w' }
  );

  this.authTokens.push({ authToken });

  await this.save();

  return authToken;
};

userSchema.methods.getVerificationToken = async function (): Promise<string> {
  const token = jwt.sign(
    {
      _id: this._id.toString(),
    },
    jwtSecret,
    { expiresIn: '1h' }
  );

  this.verificationToken = token;

  await this.save();

  return token;
};

userSchema.statics.findByCredentials = async (
  email: string,
  password: string
): Promise<IUserDocument> => {
  const user = await User.findOne({ email });
  const err = new Error("'email' or 'password' is incorrect");

  if (!user) {
    throw err;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw err;
  }

  return user;
};

userSchema.statics.verifyUser = async (verificationToken): Promise<void> => {
  const { _id } = jwt.verify(verificationToken, jwtSecret);

  const user = await User.findOne({ _id, verificationToken });

  if (!user) {
    throw new Error('verification token is not valid');
  }

  user.verificationToken = undefined;

  await user.save();
};

userSchema.pre('save', async function (): Promise<void> {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

const User = model<IUser, IUserModel>('User', userSchema);

export default User;
