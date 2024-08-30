import { pathsToModuleNameMapper, JestConfigWithTsJest } from 'ts-jest';
import { compilerOptions } from '../tsconfig.json';

const jeste2eConfig: JestConfigWithTsJest = {
    preset: 'ts-jest',
    moduleDirectories: [
        'node_modules',
        '<rootDir>'
    ],
    moduleFileExtensions: [
        'js',
        'ts',
        'json'
    ],
    rootDir: '../',
    testRegex: '.e2e-spec.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest'
    },
    collectCoverageFrom: [
        '**/*.(t|j)s'
    ],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    moduleNameMapper: pathsToModuleNameMapper(
        compilerOptions.paths, { prefix: '<rootDir>' }
    ),
    modulePaths: [
        compilerOptions.baseUrl
    ],
    roots: [
        '<rootDir>'
    ]
};

export default jeste2eConfig;
