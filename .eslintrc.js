module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    return: 'assign',
    // shadow,
    // plusplus,
    // no-useless-escape,
    // max len
    // return-assign,
    // consistent },
  },
}
