import { Twilio } from "twilio";

import { configs } from "../config";
import { smsTemplates } from "../config/constants/sms.constants";
import { ESmsEnum } from "../enums/sms.enum";

class SmsService {
  constructor(
    private client = new Twilio(
      configs.TWILIO_ACCOUNT_SID,
      configs.TWILIO_AUTH_TOKEN
    )
  ) {}

  public async sendSms(phone: string, smsAction: ESmsEnum) {
    const message = smsTemplates[smsAction];

    await this.client.messages.create({
      body: message,
      to: phone,
      messagingServiceSid: configs.TWILIO_SERVICE_SID,
    });
  }
}

export const smsService = new SmsService();
