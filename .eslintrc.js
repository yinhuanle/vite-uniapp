/*
 * @Author: CtrlC
 * @Date: 2022-07-13 10:05:45
 * @LastEditors: CtrlC
 * @LastEditTime: 2022-07-23 10:57:03
 * @Description: eslint规范
 * @FilePath: /uni-preset-vue-vite/.eslintrc.js
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  globals: {
    uni: true
  },
  parser: 'vue-eslint-parser',
  rules: {
    semi: ['warn', 'never'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['config', 'app']
      }
    ],
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
