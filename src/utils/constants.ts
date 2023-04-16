import environment from 'src/environments';

export const jwtConstants = {
  secret: environment.jwtSecretKey,
  expiresIn: environment.jwtAccessTokenExpirationTime,
};

export const emailTemplates = {
  SIGN_UP: './signUp',
  NEW_USER_CREATION: './newUserCreation',
};
