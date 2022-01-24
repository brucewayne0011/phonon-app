module.exports = {
  transformIgnorePatterns: ["node_modules/(?!(@ionic|@stencil|ionicons)/)"],
  moduleNameMapper: {
    "\\@capacitor-community/barcode-scanner": "<rootDir>/src/jest/noop.ts",
  },
};
