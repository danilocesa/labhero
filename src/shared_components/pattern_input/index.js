import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const alpha = /[A-Za-z]/;
const alphanum = /[A-Za-z0-9]/;
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

export class RegexInput extends React.Component {
	render() {
		const { regex } = this.props;

		return <TemplateInput regex={regex} {...this.props} />;
	}
}

RegexInput.propTypes = {
	regex: PropTypes.string.isRequired
};
