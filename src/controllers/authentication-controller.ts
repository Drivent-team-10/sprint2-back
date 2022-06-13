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
  // eslint-disable-next-line no-console
  console.log('userData: ', userData);

  const token = await authenticationService;
  res.status(200).send(token);
}
