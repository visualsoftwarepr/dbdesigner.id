// vue.config.js
module.exports = {
  // options...
  devServer: {
    proxy: "http://localhost",
    https: false
  },
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/"
};
