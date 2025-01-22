import { validate, print } from "@/utils";
import { z } from "zod";
import Mockjs from "mockjs";

const TextOptsSchema = z.object({
  template: z.string(),
  json: z.boolean().default(false),
  count: z
    .string()
    .transform((v) => Number.parseInt(v))
    .default("1"),
});

type TextOpts = z.infer<typeof TextOptsSchema>;

const mock = Mockjs.mock;
export const mockAction = async (userOpts: TextOpts) => {
  const { template, count, json } = await validate(TextOptsSchema, userOpts);
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(mock(template));
  }
  const str = json ? JSON.stringify(items, null, 2) : items.join(",");
  print(str);
};
