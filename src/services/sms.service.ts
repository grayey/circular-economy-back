import { BadRequestException, Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import environment from 'src/environments';
import { SMSGateways } from 'src/utils/enums';
import AxiosService from './axios.service';

const { smsConfig } = environment;
const { twilio, termii, smsGateway } = smsConfig;

const { accountSID, token, senderPhoneNumber, verificationServiceSID } = twilio;
const { apiKey, apiUrl, defaultFrom } = termii;

@Injectable()
export default class SmsService {
  private twilioClient: Twilio;

  constructor(private axiosService: AxiosService) {
    if (smsGateway === SMSGateways.TWILIO) {
      this.twilioClient = new Twilio(accountSID, token);
    }
  }

  public verify = async (phoneNumber: string) => {
    const mapper = {
      [SMSGateways.TWILIO]:
        this.initiateTwilioPhoneNumberVerification(phoneNumber),
    };

    return mapper[smsGateway];
  };

  public confirm = async (phoneNumber: string, verificationCode: string) => {
    const mapper = {
      [SMSGateways.TWILIO]: this.confirmTwilioPhoneNumber(
        phoneNumber,
        verificationCode,
      ),
    };
    return mapper[smsGateway];
  };

  public sendMessage = async (receiverPhoneNumber: string, message: string) => {
    const mapper = {
      [SMSGateways.TWILIO]: this.sendTwilioMessage(
        receiverPhoneNumber,
        message,
      ),
      [SMSGateways.TERMII]: this.sendTermiiMessage(
        receiverPhoneNumber,
        message,
      ),
    };
    return mapper[smsGateway];
  };

  //Twilio
  private initiateTwilioPhoneNumberVerification = async (
    phoneNumber: string,
  ) => {
    return await this.twilioClient.verify
      .services(verificationServiceSID)
      .verifications.create({ to: phoneNumber, channel: 'sms' });
  };

  private confirmTwilioPhoneNumber = async (
    phoneNumber: string,
    verificationCode: string,
  ) => {
    const result = await this.twilioClient.verify
      .services(verificationServiceSID)
      .verificationChecks.create({ to: phoneNumber, code: verificationCode });

    if (!result.valid || result.status !== 'approved') {
      throw new BadRequestException('Wrong code provided');
    }
    return true;
  };

  private sendTwilioMessage = async (
    receiverPhoneNumber: string,
    message: string,
  ) => {
    return this.twilioClient?.messages.create({
      body: message,
      from: senderPhoneNumber,
      to: receiverPhoneNumber,
    });
  };

  //Termii
  private sendTermiiMessage = async (to: string, sms: string) => {
    const data = {
      to,
      sms,
      from: defaultFrom,
      api_key: apiKey,
      type: 'plain',
      channel: 'generic',
    };

    return this.axiosService.post(apiUrl, data);
  };
}
