module.exports = {
  extends: ["airbnb-base", "eslint-config-prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "class-methods-use-this": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
