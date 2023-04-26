const stylelint = require('stylelint');
const path = require('path');
const fs = require('fs');

const cssPath = path.resolve(__dirname, '../assets/gh-theme.css');
console.log("### Got the path to CSS:", cssPath);

const css = fs.readFileSync(cssPath, 'utf8');
console.log("### Read the CSS:", css.replace(/(\r\n|\n|\r)/gm, " ").substring(0, 50) + "...");

stylelint.lint({
    code: css,
    config: {
        extends: 'stylelint-config-standard',
        rules: {},
    },
}).then((data) => {
    const warnings = data.results[0].warnings;
    console.log("### Linted the CSS:", warnings.length, "warnings found.");
    const report = warnings.map((warning) => {
        const string = warning.severity +
            " (" + warning.line + ":" + warning.column + "): " +
            warning.text;
        console.log("# -- " + string);
        return string;
    }).join("\n");
    fs.writeFileSync(path.resolve(__dirname, '../linting-report.txt'), report);
}).catch((err) => {
    console.error("### Error linting the CSS:", err);
});
