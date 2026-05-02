// Type "pnpm format" to apply formatting

/**
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: true,
  printWidth: 120,
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "(.*).css$",
    "^@/(.*)$",
    "^[../]",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};

export default config;
