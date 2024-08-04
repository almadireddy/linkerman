import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  {files: ['**/*.{js,mjs,cjs,ts}']},
  {plugins: {
    '@stylistic/js': stylisticJs
  }},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['apps/**/build/*.js'],
    rules: {
      semi: ['warn', 'always'],
      quotes: ['warn', 'single'],
      '@stylistic/js/object-curly-spacing': ["error", "always"]
    }
  }
];