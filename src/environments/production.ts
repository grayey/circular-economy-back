import { EnvironmentVariables } from 'src/interfaces/environment.interface';
import { SMSGateways } from 'src/utils/enums';

const production: EnvironmentVariables = {
  mongoUri:
    'mongodb+srv://tare_myn:emek%401f1@cluster0.4izef.mongodb.net/circular_economy?retryWrites=true&w=majority',
  jwtSecretKey: 'secretProdKey',
  jwtAccessTokenExpirationTime: 30 * 60, // 30 minutes
  jwtRefreshTokenExpirationTime: 3 * 24 * 60 *60, // 3 days
  mailConfig: {
    host: 'smtp.mailtrap.io',
    user: '44da93d3eb2f08',
    pass: 'b8156b67c1039e',
    defaultFrom: '"No Reply" <noreply@example.com>',
  },
  smsConfig: {
    twilio: {
      accountSID: '',
      token: '',
      verificationServiceSID: 'dhdjjdjdjdjdjdj',
      senderPhoneNumber: '',
    },
    termii: {
      apiUrl: 'https://api.ng.termii.com/api/sms/send',
      apiKey: 'TLcdqqBhQGNxajHV2kjVIhwVPkkQMw9TZ7hAEhOSjTIdIMtCjCEf6x9K0MHt8d',
      defaultFrom: '+2347065018170',
    },
    smsGateway: SMSGateways.TWILIO,
  },
  clientUrl: '',
};

export default production;
