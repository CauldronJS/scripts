module.exports = api => {
  api.cache(true);
  const config = {
    sourceMaps: true,
    plugins: [
      "@babel/plugin-syntax-jsx",
      [
        "@babel/plugin-transform-react-jsx",
        { "pragma": "Rinse", "pragmaFrag": "Rinse.Fragment" }
      ],
      "@babel/plugin-transform-modules-commonjs",
      "@babel/plugin-proposal-class-properties"
    ]
  }
  return config;
}