const TerserPlugin = require("terser-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin"); // gzip压缩
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== "development";
module.exports = {
  productionSourceMap: false,
  publicPath: isProduction ? "/static" : "/",
  configureWebpack: () => {
    //   // 代码压缩
    const codeCompression = new TerserPlugin({
      terserOptions: {
        ecma: undefined,
        warnings: false,
        parse: {},
        //生产环境自动删除console
        compress: {
          drop_debugger: true,
          drop_console: true,
          pure_funcs: ["console.log"]
        }
      },
      sourceMap: false,
      parallel: true
    });
    // gzip压缩
    const productionGzipExtensions = ["html", "js", "css"];
    const gzipCompression = new CompressionWebpackPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
      threshold: 10240, // 只有大小大于该值的资源会被处理 10240
      minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
      deleteOriginalAssets: false // 删除原文件
    });
    return {
      plugins: isProduction ? [codeCompression, gzipCompression] : [],
      // 别名配置
      resolve: {
        alias: {
          assets: "@/assets",
          common: "@/common",
          components: "@/components",
          network: "@/network",
          views: "@/views"
        }
      }
    };
  },
  chainWebpack: config => {
    const fonts = config.module.rule("fonts");
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({ bypassOnDebug: true })
      .end();
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
