#!/usr/bin/env node

import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { program } from "commander";
import { imageAction, mockAction } from "./actions/index";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const _require = createRequire(import.meta.url);
const pkgJson = _require(join(__dirname, "../package.json"));
program.args.length === 0 && program.outputHelp();

program
  .command("image")
  .description("generate image file or url")
  .requiredOption("-w, --width <width>", "image width")
  .requiredOption("-h, --height <height>", "image height")
  .option("-u, --url [url]", "image url")
  .option("-e, --url-enginer [urlEnginer]", "image url enginer, allow fakeimg,placeholder,dummyimage")
  .option("-f, --format [format]", "image format, allow png, jpg, webp, avif")
  .option("-t, --text [text]", "image text")
  .option("-n, --name [name]", "outout file name")
  .action(imageAction);

program
  .command("mock")
  .description("generate string")
  .requiredOption("-t, --template <template>", "mockjs template string")
  .option("-c, --count [count]", "count of mockjs template stirngs")
  .option("-j, --json", "output generated stirng in json format")
  .action(mockAction);

program
  .version(pkgJson.version)
  .description("generate some materials for dev")
  .usage("<command> [option]")
  .parse(process.argv);
