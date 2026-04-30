import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [
    {
        ignores: [
            '.next/**',
            'coverage/**',
            'node_modules/**',
            'setup-db.js',
            'setup-grants.js',
            'jest.setup.js',
        ],
    },
    ...nextVitals,
    ...nextTypescript,
];

export default eslintConfig;
