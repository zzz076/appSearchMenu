import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config} */
export default {
  extends: [
     'react-app',
    'react-app/jest',
     "plugin:prettier/recommended",
    'eslint:recommended',              // 基本的 ESLint 規範
    'plugin:react/recommended',        // 如果你使用 React
    eslintConfigPrettier,              // 禁用與 Prettier 衝突的 ESLint 規則
    'plugin:prettier/recommended',     // 啟用 Prettier 格式化規則
  ],
  plugins: ['prettier'],              // 啟用 Prettier 插件
  rules: {
    'prettier/prettier': 'error',      // 當格式化不符合 Prettier 規則時會顯示錯誤
  },
};
