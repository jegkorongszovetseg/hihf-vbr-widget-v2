import postcss from 'postcss';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { sync } from 'glob';
import postcssMixins from 'postcss-mixins';
import postcssNested from 'postcss-nested';
import postcssPrefixer from 'postcss-prefixer';
import postcssImport from 'postcss-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = sync(path.resolve(__dirname, '../assets/css/*.css'), {
  ignore: ['assets/css/mixins.css'],
});
// console.log(files);

files.forEach((file) => {
  var filename = file.substring(file.lastIndexOf('/') + 1, file.length).toLowerCase();
  console.log('convert file:', filename);
  if (!fs.existsSync(path.resolve(__dirname, `../dist/css`))) {
    fs.mkdirSync(path.resolve(__dirname, `../dist/css`), { recursive: true });
  }
  fs.readFile(file, (err, css) => {
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
        fs.writeFile(path.resolve(__dirname, `../dist/css/${filename}`), result.css, (err) =>
          err ? console.error(err) : true
        );
      });
  });
});
