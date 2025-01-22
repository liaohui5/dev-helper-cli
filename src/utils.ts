import type { ZodTypeAny } from "zod";
import chalk from "chalk";

export function printErrMsg(message: string) {
  console.log(chalk.red(message));
}

export function print(message: string) {
  console.log(chalk.green(message));
}

export const validate = async (schema: ZodTypeAny, datas: unknown) => {
  const { success, data, error } = await schema.safeParseAsync(datas);
  if (success) {
    return data;
  }

  printErrMsg(error.issues[0].message);
};
