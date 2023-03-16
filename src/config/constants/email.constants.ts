import { EEmailEnum } from "../../enums/email.enum";

export const allTemplates: {
  [key: string]: { subject: string; templateName: string };
} = {
  [EEmailEnum.REGISTER]: {
    subject: "Welcome to our site",
    templateName: "register",
  },
  [EEmailEnum.CHANGED_PASSWORD]: {
    subject: "Just following steps and all we be good",
    templateName: "changed.password",
  },
  [EEmailEnum.FORGOT_PASSWORD]: {
    subject: "Just following steps and all we be good",
    templateName: "forgot.password",
  },
};
