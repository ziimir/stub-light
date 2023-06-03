const fs = require('fs');
const paths = require('path');

const jsonTmpl = (body) => `{${body}}`;
const jsonPropTmpl = (k, v) => `"${k}": ${JSON.stringify(v)}`;

module.exports = function bundleOutput(options) {
    const filename = options?.filename || 'paths-map.json';

    return {
        name: 'bundle-output',
        generateBundle: (options, bundle) => {
            const outDir = options.dir;
            const files = Object.keys(bundle).reverse();

            fs.writeFileSync(
                paths.join(outDir, filename),
                jsonTmpl(jsonPropTmpl('assets', files))
            );
        }
    };
}
