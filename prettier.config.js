module.exports = {
    printWidth: 120,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    quoteProps: 'as-needed',
    jsxSingleQuote: false,
    trailingComma: 'all',
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'always',
    overrides: [
        {
            files: ['*.json'],
            options: {
                tabWidth: 2,
            },
        },
        {
            files: ['*.html', '*.hbs'],
            options: {
                singleQuote: false,
            },
        },
    ],
};
