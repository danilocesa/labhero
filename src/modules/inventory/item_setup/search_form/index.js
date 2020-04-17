import React from 'react';
import { Input, Icon } from 'antd';

class SearchForm extends React.Component {
	render() {
		return (
			<div>
				<Input prefix={<Icon type="search" />} />
			</div>
		);
	}
}

export default SearchForm;