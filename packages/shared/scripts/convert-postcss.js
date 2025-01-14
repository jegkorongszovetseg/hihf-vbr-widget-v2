import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sync } from 'glob';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssMixins from 'postcss-mixins';
import postcssNested from 'postcss-nested';
import postcssPrefixer from 'postcss-prefixer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = sync(path.resolve(__dirname, '../assets/css/*.css'), {
  ignore: ['assets/css/mixins.css'],
});
// console.log(files);

files.forEach((file) => {
  const filename = file.substring(file.lastIndexOf('/') + 1, file.length).toLowerCase();
  console.log('convert file:', filename);
  if (!fs.existsSync(path.resolve(__dirname, `../dist/css`))) {
    fs.mkdirSync(path.resolve(__dirname, `../dist/css`), { recursive: true });
  }
  fs.readFile(file, (err, css) => {
    if (err)
      throw err;
    postcss([
      postcssImport(),
      postcssNested,
      postcssMixins,
      postcssPrefixer({
        prefix: 'mjsz-vbr-',
        ignore: [/icon/, /is-[a-zA-Z]*/, /transition-[a-zA-Z]*/, /g-[a-zA-Z]*/, 'label'],
      }),
    ])
      .process(css, { from: `assets/css/${filename}`, to: `dist/css/${filename}` })
      .then((result) => {
        fs.writeFile(path.resolve(__dirname, `../dist/css/${filename}`), result.css, err =>
          err ? console.error(err) : true);
      });
  });
});
