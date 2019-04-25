const { override, fixBabelImports, addLessLoader } = require('customize-cra');


module.exports = override( 
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { 
      '@primary-color': '#8A73F9',
      '@border-color-base': '#8A73F9' 
     },
  }),
);