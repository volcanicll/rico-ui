module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      typescript: {}
    }
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off"
  }
};