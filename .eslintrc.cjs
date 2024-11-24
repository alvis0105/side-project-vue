// .eslintrc.cjs
module.exports = {
    root: true,
    env: {
      browser: true,
      node: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended', // 基本 ESLint 配置
      'plugin:vue/vue3-recommended', // Vue 3 推薦規則
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: [
      'vue', // Vue 套件
    ],
    rules: {
      // 根據需求調整或自定義規則
      'no-unused-vars': 'warn',
      'vue/no-unused-vars': 'warn',
      'vue/multi-word-component-names': 'off',
    },
  }
