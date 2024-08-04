import js from '@eslint/js';

import rootConfig from '../../eslint.config.mjs';

export default [
  { ...js.configs.recommended },
  ...rootConfig,
  { ignores: ['build/*'] }
];