import authenticationService, { SignInParams } from '@/services/authentication-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  const result = await authenticationService.signIn({ email, password });

  res.status(httpStatus.OK).send(result);
}

export async function githubSignIn(req: Request, res: Response) {
  const code = req.body.code;
  const { access_token, token_type } = await authenticationService.getGithubToken(JSON.stringify(code));
  if (!access_token || !token_type) throw Error('Erro de login github');

  const userData = await authenticationService.findGithubUser(access_token, token_type);

  const token = await authenticationService.loginWithGithub(userData.id, userData.email);

  const response = { user: { id: userData.id, email: userData.email }, token };

  res.status(200).json(response);
}
