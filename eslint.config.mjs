import antfu from "@antfu/eslint-config";

export default antfu({
  css: false,
  react: true,
  typescript: true,
  imports: {
    order: {
      "groups": [
        "builtin",
        "external",
        "parent",
        "sibling",
        "index",
        "object",
        "type",
      ],
      "pathGroups": [
        {
          pattern: "{react,react-dom/**,react-router-dom,next,next/**}",
          group: "builtin",
          position: "before",
        },
        {
          pattern: "#/**",
          group: "parent",
          position: "before",
        },
      ],
      "pathGroupsExcludedImportTypes": ["builtin", "object"],
      "alphabetize": {
        order: "asc",
      },
      "newlines-between": "always",
    },
  },
}, {
  rules: {
    "style/quotes": ["error", "double"],
    "style/semi": ["error", "always"],
    "ts/no-explicit-any": "error",
    "ts/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "unused-imports/no-unused-imports": "error",
  },
});
