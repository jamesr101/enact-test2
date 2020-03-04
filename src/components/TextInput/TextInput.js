import React from 'react';
import kind from '@enact/core/kind';
import css from './TextInput.module.less';
import Heading from '@enact/moonstone/Heading';
import Input from '@enact/moonstone/Input';
import BodyText from '@enact/ui/BodyText/BodyText';

const TextInput = kind({
	name: 'TextInput',

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

	render: function ({heading, value, onChange, name, placeholder, errors, ...props}) {
		const type = (name === 'password') ? 'password' : '';

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