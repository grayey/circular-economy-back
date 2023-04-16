import { SMSGateways } from 'src/utils/enums';

export interface EnvironmentVariables {
  mongoUri: string;
  jwtSecretKey: string;
  jwtAccessTokenExpirationTime: number;
  jwtRefreshTokenExpirationTime: number;
  mailConfig: {
    host: string;
    user: string;
    pass: string;
    defaultFrom: string;
  };
  smsConfig: {
    twilio: {
      accountSID: string;
      token: string;
      verificationServiceSID: string;
      senderPhoneNumber: string;
    };
    termii: {
      apiUrl: string;
      apiKey: string;
      defaultFrom: string;
    };
    smsGateway: SMSGateways;
  };
  clientUrl: string;
}
