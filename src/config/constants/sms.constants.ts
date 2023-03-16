import { ESmsEnum } from "../../enums/sms.enum";

export const smsTemplates: { [key: string]: string } = {
  [ESmsEnum.REGISTER]: "Welcome to our site",

  [ESmsEnum.CHANGED_PASSWORD]: "You change password",

  [ESmsEnum.FORGOT_PASSWORD]:
    "If you forgot password - just reset it on your email",
};
