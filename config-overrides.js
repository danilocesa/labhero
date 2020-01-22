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
      '@border-color-base': '#BBADFF',
      '@table-header-bg': '#8a74f9',
			'@table-header-sort-bg': '#8a74f9',
			'@table-header-color': 'white'
			// '@table-padding-vertical': '8px',
			// '@table-padding-horizontal': '16px'
    },
  }),
);
