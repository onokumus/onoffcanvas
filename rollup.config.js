import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const banner = `/*!
* ${pkg.name} ${pkg.homepage}
* ${pkg.description}
* @version: ${pkg.version}
* @author: ${pkg.author}
* @license: ${pkg.license}
*/`;

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/onoffcanvas.esm.js',
        banner,
        format: 'es',
        sourcemap: true,
      },
      {
        name: 'OnoffCanvas',
        file: production ? 'dist/onoffcanvas.js' : 'docs/assets/js/onoffcanvas.js',
        banner,
        format: 'umd',
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        typescript: require('typescript'),
      }),
      resolve(),
      commonjs(),
    ],
  },
];
