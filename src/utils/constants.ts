import environment from 'src/environments';

export const jwtConstants = {
  secret: environment.jwtSecretKey,
};

export const emailTemplates = {
  SIGN_UP: './signUp',
  NEW_USER_CREATION: './newUserCreation',
};
