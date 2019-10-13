  
module.exports =  {
    parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
    extends:  [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
      'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from @typescript-eslint/eslint-plugin
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
      'prettier',
      'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    parserOptions:  {
      project: "./tsconfig.json",
      ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
      sourceType:  'module',  // Allows for the use of imports
      ecmaFeatures:  {
        jsx:  true,  // Allows for the parsing of JSX
      },
    },
    rules:  {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/indent": ["error", 2],
      "@typescript-eslint/camelcase": ["error", { "properties": "always", allow: ["_generated__"] }]
    },
    settings:  {
      react:  {
        version:  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
      },
    },
  };
