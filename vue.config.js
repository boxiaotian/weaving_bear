module.exports = {
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
  // chainWebpack: config => {
  //   if (process.env.NODE_ENV === "production") {
  //     config.plugin("uglify").tap(([options]) => {
  //       // 去除 console.log
  //       return [
  //         Object.assign(options, {
  //           uglifyOptions: {
  //             compress: {
  //               drop_console: true,
  //               pure_funcs: ["console.log"]
  //             }
  //           }
  //         })
  //       ];
  //     });
  //   }
  // }
  // devServer: {
  //   proxy: {
  //     "/api": {
  //       target: "<url>",
  //       ws: true,
  //       changeOrigin: true
  //     },
  //     "/foo": {
  //       target: "<other_url>"
  //     }
  //   }
  // }
};
