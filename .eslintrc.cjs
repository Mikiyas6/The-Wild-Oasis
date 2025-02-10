module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
<<<<<<< HEAD
    "no-unused-vars": "off",
    "react/prop-types": "off",
=======
    "no-unused-vars": 0,
<<<<<<< HEAD
    "react/prop-types": "off",
=======
>>>>>>> c5f728bc16b0643f1c9debc2547ca187a3731f2c
>>>>>>> 5035407718b514f86506a147577f2145f9705cfb
  },
};
