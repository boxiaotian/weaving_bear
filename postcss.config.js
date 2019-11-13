module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ["Android >= 4.0", "iOS >= 7"]
    },
    "postcss-pxtorem": {
      rootValue: 75,
      unitPrecision: 3,
      propList: ["*"],
      selectorBlackList: [],
      minPixelValue: 2
    }
  }
};
