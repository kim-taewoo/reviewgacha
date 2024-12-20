const stylistic = require("@stylistic/eslint-plugin")

// formatting 관련 설정은 eslint-plugin-stylistic 를 사용
// https://eslint.style/packages/default
// @stylistic/eslint-plugin 의 기본 설정이 아래와 같고, 굳이 이렇게 코드로 꺼내서 사용할 필요는 없지만 default 설정 참고용으로 남김
const customized = stylistic.configs.customize({
  arrowParens: false,
  blockSpacing: true,
  braceStyle: "stroustrup",
  commaDangle: "always-multiline",
  indent: 2,
  jsx: true,
  quotes: "double",
  semi: false,
})

module.exports = {
  root: true,
  plugins: ["@stylistic"],
  extends: [
    "next/core-web-vitals",
    "next/typescript",
    "plugin:tailwindcss/recommended",
  ],
  // 추가 가능한 @stylistic rules. https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin/configs/customize.ts
  // 물론 그냥 eslint rules 도 추가 가능
  rules: {
    ...customized.rules,
    "@typescript-eslint/no-require-imports": "off",
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
        "alphabetize": {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1, maxBOF: 0 }],
    "no-multi-spaces": "error",
    "no-unused-vars": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
  },
}
