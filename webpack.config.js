const path = require("path");

const config = {
  devtool: "inline-source-map",
  // webpackがバンドルの構築を開始するエントリポイント
  entry: path.resolve(__dirname, "scripts/index.tsx"),
  output: {
    // 出力するファイル名
    filename: "bundle.js",
    // 出力フォルダ
    path: path.resolve(__dirname, "public/js"),
  },
  module: {
    rules: [
      // TypeScriptを処理するローダー
      { test: /\.tsx?$/, loader: "ts-loader" },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    // モジュールを探すフォルダ（node_modulesとscriptsフォルダを対象にする）
    modules: ["node_modules", path.resolve(__dirname, "scripts")],
  },
};

module.exports = config;
