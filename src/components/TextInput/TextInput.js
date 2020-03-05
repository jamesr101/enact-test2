import React from 'react';
import kind from '@enact/core/kind';
import css from './TextInput.module.less';
import Heading from '@enact/moonstone/Heading';
import Input from '@enact/moonstone/Input';
import BodyText from '@enact/ui/BodyText/BodyText';
import PropTypes from 'prop-types';

const TextInput = kind({
	name: 'TextInput',

	propTypes: {
		heading: PropTypes.string,
		value: PropTypes.string,
		onChange: PropTypes.func,
		name: PropTypes.string,
		placeholder: PropTypes.string,
		errors: PropTypes.string
	},

	styles: {
		css,
		className: 'textInput'
	},

	handlers: {
		onChange: (ev, {name, onChange}) => {
			if (onChange) {
				onChange(name, ev.value);
			}
		}
	},

	computed: {
		type: ({name}) => {
			return (name === 'password') ? 'password' : '';;
		}
	},

	render: function ({heading, value, onChange, placeholder, errors, type, ...props}) {
		return (
			<div className={props.className}>
				<Heading>{heading}</Heading>
				<Input
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				/>
				<BodyText className={css.error}>{errors}</BodyText>
			</div>
		);
	}
});

export default TextInput;