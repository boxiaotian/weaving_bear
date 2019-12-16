let filePath;
if (process.env.NODE_ENV == "development") {
  filePath = "/";
} else {
  filePath = "/static";
}
module.exports = {
  publicPath: filePath,
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views"
      }
    }
  },
  chainWebpack: config => {
    const fonts = config.module.rule("fonts");
    fonts.uses.clear();
    fonts
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: 10000,
        name: "fonts/[name].[hash.7].[ext]"
      });
  }
};
