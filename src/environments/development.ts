import { EnvironmentVariables } from 'src/interfaces/environment.interface';
import { SMSGateways } from 'src/utils/enums';

const development: EnvironmentVariables = {
  mongoUri:
    'mongodb+srv://Sheyilah:USER%40admin1@cluster0.yudcpim.mongodb.net/?retryWrites=true&w=majority',
  jwtSecretKey: 'secretDevKey',
  mailConfig: {
    host: 'smtp.mailtrap.io',
    user: '6648073274e76d',
    pass: '3bed5be23c02e8',
    defaultFrom: '"No Reply" <noreply@example.com>',
  },
  smsConfig: {
    termii: {
      apiUrl: 'https://api.ng.termii.com/api/sms/send',
      apiKey: 'TLcdqqBhQGNxajHV2kjVIhwVPkkQMw9TZ7hAEhOSjTIdIMtCjCEf6x9K0MHt8d',
      defaultFrom: '+2347065018170',
    },
    twilio: {
      accountSID: '',
      token: '',
      verificationServiceSID: 'tetsttsinghhdhd',
      senderPhoneNumber: '',
    },
    smsGateway: SMSGateways.TERMII,
  },
  clientUrl: 'http://localhost:3000',
};

export default development;
