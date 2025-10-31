import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

export default {
  input: 'src/heat-pump-flow-card.ts',
  output: {
    file: 'dist/heat-pump-flow-card.js',
    format: 'iife',
    name: 'HeatPumpFlowCard',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
    }),
    json(),
    terser({
      format: {
        comments: false,
      },
    }),
  ],
};
