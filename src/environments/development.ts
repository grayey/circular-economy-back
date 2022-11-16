import { EnvironmentVariables } from 'src/interfaces/environment.interface';
import { SMSGateways } from 'src/utils/enums';

const development: EnvironmentVariables = {
  mongoUri:
    'mongodb+srv://tare_myn:tare_myn%40%23@cluster0.4izef.mongodb.net/circular_economy?retryWrites=true&w=majority',
  jwtSecretKey: 'secretDevKey',
  mailConfig: {
    host: 'smtp.mailtrap.io',
    user: '44da93d3eb2f08',
    pass: 'b8156b67c1039e',
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
  clientUrl: 'https://localhost:30001',
};

export default development;
