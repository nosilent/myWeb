const { override, fixBabelImports,addBabelPlugin,setWebpackPublicPath,addWebpackExternals } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addBabelPlugin(
    ["prismjs", {
      "languages": ["javascript", "css", "html", "jsx", "go", "dart", "git", "bash", "less", "python", "typescript", "js-extras", "json", "stylus"],
    "plugins": ["line-numbers", "show-language"],
    "theme": "okaidia",
    "css": true
    }]
  ),
  setWebpackPublicPath(process.env.NODE_ENV === 'production' ? 'build': ''),
  addWebpackExternals({
    react: "React",
    "react-dom": "ReactDOM"
  })
);