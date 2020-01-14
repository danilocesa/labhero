import React from 'react';
import { Input } from 'antd';

const alpha = /[A-z]/;
const alphanum = /[A-z0-9]/;
const num = /[0-9]/;

class TemplateInput extends React.Component {
	onKeyPress = (evt) => {
		const { regex } = this.props;

		// eslint-disable-next-line react/prop-types
		if (!regex.test(evt.key)) {
			evt.preventDefault();
		}
	}
	
	render() {
		return <Input onKeyPress={this.onKeyPress} {...this.props} />;
	}
}

export class AlphaInput extends React.Component {
	render() {
		return <TemplateInput regex={alpha} {...this.props} />;
	}
}

export class AlphaNumInput extends React.Component {
	render() {
		return <TemplateInput regex={alphanum} {...this.props} />;
	}
}

export class NumberInput extends React.Component {
	render() {
		return <TemplateInput regex={num} {...this.props} />;
	}
}
