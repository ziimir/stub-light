const nodeResolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const iife = require('rollup-plugin-iife');

const bundleOutput = require('./tools/rollup/rollup-plugin-bundle-output');

module.exports = {
    input: 'src/index.ts',
    plugins: [
        nodeResolve({ extensions: ['.ts', '.js'] }),
        commonjs(),
        typescript(),
        iife({
            sourcemap: true,
            strict: true,
        }),
        bundleOutput({ filename: 'paths-map.json' }),
    ],
    output: {
        dir: 'build/',
        format: 'es',
        sourcemap: 'inline',
        manualChunks: (id) => {
            if (id.includes('node_modules')) {
                return 'vendor';
            }
        },
    },
};
