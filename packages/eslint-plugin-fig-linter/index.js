module.exports = {
  rules: {
    "no-malicious-script": require("./rules/no-malicious-script"),
    "no-name-equals": require("./rules/no-name-equals"),
    "no-invalid-option": require("./rules/no-invalid-option"),
    "no-invalid-name": require("./rules/no-invalid-name"),
    "no-empty-array-values": require("./rules/no-empty-array-values"),
    "no-useless-insertvalue": require("./rules/no-useless-insertvalue"),
    "no-duplicate-options-subcommands": require("./rules/no-duplicate-options-subcommands"),
    "no-missing-default-export": require("./rules/no-missing-default-export"),
    "no-useless-arrays": require("./rules/no-useless-arrays"),
    "conventional-descriptions": require("./rules/conventional-descriptions"),
    "no-default-value-props": require("./rules/no-default-value-props"),
  },
  configs: {
    recommended: {
      plugins: ["@withfig/fig-linter"],
      rules: {
        "@withfig/fig-linter/no-malicious-script": "error",
        "@withfig/fig-linter/no-useless-insertvalue": "error",
        "@withfig/fig-linter/no-empty-array-values": "error",
        "@withfig/fig-linter/no-name-equals": "error",
        "@withfig/fig-linter/no-default-value-props": ["error", [
          {path: "options.[*].isRequired", defaultValue: false},
          {path: "args.[*]?.isOptional", defaultValue: false},
          {path: "args.[*]?.isVariadic", defaultValue: false},
        ]],
        // TODO: Re-Enable Rule if we got a proper flag for that
        "@withfig/fig-linter/no-invalid-option": "off",
        "@withfig/fig-linter/no-invalid-name": "error",
        "@withfig/fig-linter/no-duplicate-options-subcommands": "error",
        "@withfig/fig-linter/no-missing-default-export": "off",
        "@withfig/fig-linter/no-useless-arrays": "error",
        "@withfig/fig-linter/conventional-descriptions": "error",
      },
      overrides: [
        {
          files: "src/**/*.ts",
          rules: {
            "@withfig/fig-linter/no-missing-default-export": "error",
          },
        },
      ],
    },
  },
};
