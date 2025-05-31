import antfu from "@antfu/eslint-config";

export default antfu({
  react: true,
  typescript: true,
}, {
  rules: {
    "style/quotes": ["error", "double"],
    "style/semi": ["error", "always"],
    "import/order": [
      "error",
      {
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
        ],
        "pathGroupsExcludedImportTypes": ["builtin"],
        "alphabetize": {
          order: "asc",
        },
        "newlines-between": "always",
      },
    ],
  },
});
