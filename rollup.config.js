import { terser } from "rollup-plugin-terser";

const config = {
  input: 'src/markup_factory.js',
  output: {file: "build/js/markup_factory.min.js",
           format: "es"},
  plugins: [terser()]
};

export default config;
