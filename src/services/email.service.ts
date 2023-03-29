import EmailTemplates from "email-templates";
import nodemailer, { Transporter } from "nodemailer";
import * as path from "path";

import { allTemplates, configs } from "../config";
import { EEmailEnum } from "../enums";

class EmailService {
  private transporter: Transporter;
  private templateParser;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: configs.NO_REPLY_EMAIL,
        pass: configs.NO_REPLY_PASSWORD,
      },
    });

    this.templateParser = new EmailTemplates({
      views: {
        root: path.join(process.cwd(), "src", "static"),
        options: {
          extension: "hbs",
        },
      },
      juice: true,
      juiceResources: {
        webResources: {
          relativeTo: path.join(process.cwd(), "src", "static", "styles"),
        },
      },
    });
  }

  public async sendEmail(
    email: string,
    emailAction: EEmailEnum,
    locals: Record<string, string> = {}
  ) {
    const templateData = allTemplates[emailAction];
    locals.frontURL = configs.FRONT_URL;

    const html = await this.templateParser.render(
      templateData.templateName,
      locals
    );

    return this.transporter.sendMail({
      from: "No reply",
      to: email,
      subject: templateData.subject,
      html,
    });
  }
}

export const emailService = new EmailService();
