module.exports = {
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  rules: {
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["Home", "Account"],
      },
    ],
  },
};
