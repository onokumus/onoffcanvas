import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const banner = `/*!
* ${pkg.name} - v${pkg.version}
* ${pkg.description}
* ${pkg.homepage}
*
* Made by ${pkg.author}
* Under ${pkg.license} License
*/`;

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: [
      'src/index.ts',
      'src/constants.ts',
      // 'src/interface.ts',
      'src/util.ts'
    ],
    output: [
      {
        dir: 'dist/cjs',
        banner,
        format: 'cjs',
      },
      {
        dir: 'dist/modules',
        banner,
        format: 'es',
      }
    ],
    plugins: [
      typescript({
        typescript: require('typescript'),
        target: 'ES5',
        include: ['src/**/*.ts'],
        tsconfig: false
      }),
      resolve(),
      commonjs(),
    ],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        name: 'OnoffCanvas',
        file: pkg.browser,
        banner,
        format: 'umd',
        sourcemap: true
      },
    ],
    plugins: [
      typescript({
        typescript: require('typescript'),
        target: 'ES5',
        importHelpers: true,
        include: ['src/**/*.ts'],
        tsconfig: false
      }),
      resolve(),
      commonjs()
    ],
  },
];
