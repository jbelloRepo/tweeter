module.exports = {
  env: {
    browser: true,
    es2021: true,
    jquery: true
  },
  extends: "standard",
  overrides: [
    {
      env: {
        node: true
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"]
  }
};
