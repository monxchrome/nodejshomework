import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { oldPassword } from "../models";

dayjs.extend(utc);

const oldPasswordRemover = async (): Promise<void> => {
  const previousYear = dayjs().utc().subtract(1, "year");

  await oldPassword.deleteMany({ createdAt: { $lte: previousYear } });
};

export const removeOldPasswords = new CronJob("0 0 * * * ", oldPasswordRemover);
