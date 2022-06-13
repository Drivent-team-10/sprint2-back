import sessionRepository from '@/repositories/session-repository';
import userRepository from '@/repositories/user-repository';
import { exclude } from '@/utils/prisma-utils';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { invalidCredentialsError } from './errors';

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, 'password'),
    token,
  };
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, { id: true, email: true, password: true });
  if (!user) throw invalidCredentialsError();

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

async function getGithubToken(code: string) {
  const config = {
    headers: {
      Accept: 'application/json',
    },
  };

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: JSON.parse(code),
  });

  const URL = 'https://github.com/login/oauth/access_token?' + params;

  const { data } = await axios.post(URL, null, config);

  return data;
}

async function findGithubUser(token_type: string, access_token: string) {
  const URL = 'https://api.github.com/user';

  const config = {
    headers: {
      Authorization: `${token_type} ${access_token}`,
    },
  };

  const { data } = await axios.get(URL, config);

  return data;
}

export type SignInParams = Pick<User, 'email' | 'password'>;

type SignInResult = {
  user: Pick<User, 'id' | 'email'>;
  token: string;
};

type GetUserOrFailResult = Pick<User, 'id' | 'email' | 'password'>;

const authenticationService = {
  signIn,
  getGithubToken,
  findGithubUser,
};

export default authenticationService;
export * from './errors';
