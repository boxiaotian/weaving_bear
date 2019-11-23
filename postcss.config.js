// module.exports = {
//   plugins: {
//     autoprefixer: {
//       browsers: ["Android >= 4.0", "iOS >= 7"]
//     },
//     "postcss-pxtorem": {
//       rootValue: 75,
//       unitPrecision: 3,
//       propList: ["*"],
//       selectorBlackList: [],
//       minPixelValue: 2
//     }
//   }
// };

module.exports = ({ file }) => {
  let rootValue;
  // vant 37.5 https://github.com/youzan/vant/issues/1181
  if (file && file.dirname && file.dirname.indexOf("vant") > -1) {
    rootValue = 37.5;
  } else {
    rootValue = 75;
  }
  return {
    plugins: {
      autoprefixer: {
        browsers: ["Android >= 4.0", "iOS >= 7"]
      },
      "postcss-pxtorem": {
        rootValue,
        viewportWidth: 750,
        unitPrecision: 3,
        propList: ["*"],
        minPixelValue: 2
      }
    }
  };
};
