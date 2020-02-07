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
			'@table-header-bg-sm': '#8A73F9',
			'@table-header-bg': '#8A73F9',
			'@table-header-sort-bg': '#8A73F9',
			'@table-header-color': '#FFFFFF',
			'@table-padding-vertical': '8px',
			'@table-padding-horizontal': '8px',
			// '@table-border-radius-base': '5px'
    },
  }),
);
