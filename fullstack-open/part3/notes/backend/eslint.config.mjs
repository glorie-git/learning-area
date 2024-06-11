import stylisticJs from '@stylistic/eslint-plugin-js'
import js from "@eslint/js";


export default [
  js.configs.recommended,
  {   
      plugins: {
        '@stylistic/js': stylisticJs
      },
      ignores: ["dist"],
      rules: {
        "no-unused-vars": "error",
        "no-undef": "error",
        '@stylistic/js/indent': [
            'error',
            2
        ],
        '@stylistic/js/linebreak-style': [
            'error',
            'unix'
        ],
        '@stylistic/js/quotes': [
            'error',
            'single'
        ],
        '@stylistic/js/semi': [
            'error',
            'never'
        ],
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ]
      }
  }
];