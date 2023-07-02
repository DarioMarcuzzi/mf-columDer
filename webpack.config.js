const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "team-columDer",
    projectName: "mf-columDer",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [require("autoprefixer")],
                },
              },
            },
          ],
        },
      ],
    },
  });
};
