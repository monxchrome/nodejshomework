import { removeOldPasswords } from "./old.passwords.delete.cron";
import { removeOldTokens } from "./old.tokens.delete.cron";

export const cronRunner = () => {
  removeOldTokens.start();
  removeOldPasswords.start();
};
