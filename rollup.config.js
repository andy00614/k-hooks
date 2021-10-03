import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

export default [
  // UMD for browser-friendly build
  {
    input: 'packages/core/index.ts',
    output: {
      name: 'k-hooks.js',
			file: pkg.browser,
      format: 'umd',
      exports: 'auto'
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript()
    ]
  },
  // CommonJS for Node and ES module for bundlers build
  {
    input: 'packages/core/index.ts',
    external: ['ms'],
    plugins: [
      typescript()
    ],
    output: [
      {  file: pkg.main, format: 'cjs', exports: 'auto' },
      {  file: pkg.module, format: 'es', exports: 'auto' }
    ]
  }
];
