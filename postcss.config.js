module.exports = {
    plugins: [
        require('postcss-import')(),
        require('postcss-url')({
            url: 'copy',
            basePath: '.',
            assetsPath: 'build/',
        }),
        require('postcss-custom-media')({
            importFrom: './src/mq.json',
        }),
        require('postcss-custom-properties')(),
        require('postcss-calc')(),
        require('postcss-nested')(),
        require('autoprefixer')(),
    ],
};
