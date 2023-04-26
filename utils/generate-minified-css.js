const { minify } = require('csso');
const path = require('path');
const fs = require('fs');

const cssPath = path.resolve(__dirname, '../assets/gh-theme.css');
console.log("### Got the path to CSS:", cssPath);

const css = fs.readFileSync(cssPath, 'utf8');
console.log("### Read the CSS:", css.replace(/(\r\n|\n|\r)/gm, " ").substring(0, 50) + "...");

const minifiedCss = minify(css).css;
console.log("### Minified the CSS:", minifiedCss.substring(0, 50) + "...");

const minifiedCssPath = path.resolve(__dirname, '../assets/gh-theme.min.css');
fs.writeFileSync(minifiedCssPath, minifiedCss);
console.log("### Wrote the minified CSS to:", minifiedCssPath);