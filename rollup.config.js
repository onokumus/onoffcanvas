import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
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
    input: 'dist/modules/index.js',
    output: [
      {
        file: pkg.main,
        banner,
        format: 'cjs',
      },
    ],
    plugins: [
      production && babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs(),
    ],
  },
  {
    input: 'dist/cjs/index.js',
    output: [
      {
        name: 'OnoffCanvas',
        file: pkg.browser,
        format: 'umd',
        sourcemap: true
      },
    ],
    plugins: [
      production && babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs()
    ],
  },
];
