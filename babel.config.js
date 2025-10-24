// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // add extra plugins later (e.g. 'nativewind/babel') if needed
    ],
  };
};
