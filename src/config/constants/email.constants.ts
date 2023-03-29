import { EEmailEnum } from "../../enums";

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
  [EEmailEnum.ACTIVATE_EMAIL]: {
    subject: "Just press the button",
    templateName: "activate.email",
  },
};
