module.exports = {
  env: {
    browser: false,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'prettier'
  ],
  plugins: [
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // Prettier integration
    'prettier/prettier': 'error',

    // Code quality
    'no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    'no-console': 'off', // Allow console.log for educational purposes
    'no-debugger': 'warn',
    'no-alert': 'warn',

    // Best practices
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-return-await': 'error',
    'require-await': 'error',

    // Variables
    'no-var': 'error',
    'prefer-const': 'error',
    'no-use-before-define': ['error', {
      functions: false,
      classes: true,
      variables: true
    }],

    // Functions
    'arrow-body-style': ['error', 'as-needed'],
    'prefer-arrow-callback': 'error',

    // Complexity
    'complexity': ['warn', 10],
    'max-depth': ['warn', 4],
    'max-lines-per-function': ['warn', {
      max: 50,
      skipBlankLines: true,
      skipComments: true
    }],

    // Documentation
    'valid-jsdoc': ['warn', {
      requireReturn: false,
      requireReturnDescription: false,
      requireParamDescription: true
    }]
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/*.spec.js'],
      rules: {
        'max-lines-per-function': 'off', // Tests can be longer
        'complexity': 'off' // Test files can be more complex
      }
    },
    {
      files: ['scripts/**/*.js'],
      rules: {
        'no-console': 'off' // Scripts need console output
      }
    }
  ]
};