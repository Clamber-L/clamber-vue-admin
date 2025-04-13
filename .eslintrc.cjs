module.exports = {
  // 运行环境
  env: {
    browser: true, // 浏览器
    es6: true, // es6语法
    jest: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    jsxPragma: 'React',
    project: './tsconfig.eslint.json',
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.eslint.json",
      }
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.json', '.vue'],
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    // airbnb规范
    // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb
    'airbnb',
    // 兼容typescript的airbnb规范
    // https://github.com/iamturns/eslint-config-airbnb-typescript
    'airbnb-typescript',

    // typescript的eslint插件
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',

    // 使用prettier格式化代码
    // https://github.com/prettier/eslint-config-prettier#readme
    'prettier',
    // 整合typescript-eslint与prettier
    // https://github.com/prettier/eslint-plugin-prettier
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  plugins: ['@typescript-eslint', 'vue', 'prettier', 'import', 'unused-imports'],
  rules: {
    'no-console': 'off',
    'no-var-requires': 'off',
    'no-restricted-syntax': 'off',
    'no-continue': 'off',
    'no-await-in-loop': 'off',
    'no-return-await': 'off',
    'no-multi-assign': 'off',
    'no-param-reassign': [2, { props: false }],
    'max-classes-per-file': 'off',
    'class-methods-use-this': 'off',
    'guard-for-in': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'no-lonely-if': 'off',
    'no-bitwise': ['error', { allow: ['~'] }],

    /* ********************************** Module Import ********************************** */

    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-absolute-path': 'off',
    'import/extensions': 'off',

    // 一部分文件在导入devDependencies的依赖时不报错
    'import/no-extraneous-dependencies': [
      1,
      {
        devDependencies: [
          '**/*.test.{ts,js}',
          '**/*.spec.{ts,js}',
          'build/**/*.{ts,js}',
          'mock/**/*.{ts,js}',
          '**.{ts,js}',
        ],
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    /** 允许ts使用命名空间 */
    '@typescript-eslint/no-namespace': 'off',
    /**
     * 使用新vue3.3的defineProps解构语法需要关闭这个校验
     * eslint-plugin-vue新版本已废弃 vue/no-setup-props-destructure,如果新版本eslint-plugin-vue
     * 需要改成vue/no-setup-props-reactivity-loss规则
     * */
    'vue/no-setup-props-destructure': 'off',
    'no-undef': 'off',
    'no-var': 'error', // 不能使用var
    'no-multiple-empty-lines': ['warn', { max: 2 }], // 不允许多个空行
    quotes: [1, 'single'], //引号类型 `` "" ''
    semi: ['error', 'never'], // 不允许在末尾加分号
    'vue/multi-word-component-names': 'off', //关闭组件命名规则
    '@typescript-eslint/no-explicit-any': 'off', // 关闭any校验
    'no-redeclare': 2, //禁止重复声明变量
    'eol-last': 'off', // 关闭行尾符（linebreak-style）的校验

    /* ********************************** Typescript ********************************** */
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-for-in-array': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',

    // 自动删除未使用的导入
    // https://github.com/sweepline/eslint-plugin-unused-imports
    'no-unused-vars': 'off',
    "import/no-unresolved": "error",
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 1,
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
  }
}
