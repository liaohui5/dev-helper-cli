import { print, validate } from "@/utils";
import { z } from "zod";
import { confirm } from "@inquirer/prompts";
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const imageActionOptsSchema = z.object({
  width: z.string().transform((v) => Number.parseInt(v)),
  height: z.string().transform((v) => Number.parseInt(v)),
  format: z.enum(["png", "jpg", "webp", "avif"]).default("png"),
  url: z.boolean().default(false),
  urlEnginer: z.enum(["fakeimg", "placeholder", "dummyimage"]).default("fakeimg"),
  name: z.string().default("output"),
  text: z.string().default(""),
});

type imageActionOpts = z.infer<typeof imageActionOptsSchema>;

export const imageAction = async (userOpts: imageActionOpts) => {
  const options = await validate(imageActionOptsSchema, userOpts);

  options.text = options.text ? options.text : `${options.width}x${options.height}`;

  if (options.url) {
    genImageURL(options);
  } else {
    await genImageFile(options);
  }
};

function genImageURL(opts: imageActionOpts) {
  const { width, height, text, urlEnginer } = opts;
  const imageUrlMap = {
    fakeimg: `https://fakeimg.pl/${width}x${height}/?retina=1&text=${text}&font=noto`,
    placeholder: `https://open-placeholder.vercel.app/${width}x${height}`,
    dummyimage: `https://dummyimage.com/${width}x${height}/000/fff?text=${text}`,
  };
  print(imageUrlMap[urlEnginer]);
}

async function genImageFile(opts: imageActionOpts) {
  const { text, width, height, format, name } = opts;
  const filePath = path.join("./", `${name}.${format}`);

  let isOverride = true;
  if (fs.existsSync(filePath)) {
    isOverride = await confirm({
      message: `The file ${filePath} already exists, do you want to override it?`,
      default: true,
    });
  }

  if (!isOverride) {
    return;
  }

  const results = await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: {
        r: 0,
        g: 0,
        b: 0,
        alpha: 0,
      },
    },
  })
    .composite([
      {
        input: {
          text: {
            text: format === "jpg" ? `<span foreground="white">${text}</span>` : text,
            dpi: Math.max(width, height),
            align: "center",
            rgba: true,
          },
        },
        gravity: "centre",
      },
    ])
    .toFormat(format)
    .toFile(filePath);

  const fileInfo = JSON.stringify(results, null, 2);
  print(`${fileInfo} \n\n${filePath} file generated`);
}
