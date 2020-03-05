import React from 'react';
import kind from '@enact/core/kind';
import css from './MultiSelectInput.module.less';
import Heading from '@enact/moonstone/Heading';
import Dropdown from '@enact/moonstone/Dropdown';
import BodyText from '@enact/ui/BodyText/BodyText';
import PropTypes from 'prop-types';

const MultiSelectInput = kind({
	name: 'MultiSelectInput',

	propTypes: {
		heading: PropTypes.string,
		value: PropTypes.array,
		onSelect: PropTypes.func,
		children: PropTypes.node,
		errors: PropTypes.string
	},

	styles: {
		css,
		className: 'multiSelectInput'
	},

	computed: {
		selectedMessage: ({value}) => {
			return value.length ? 'Selected:' : 'You can select multiple';
		}
	},

	handlers: {
		onSelect: (ev, {name, onSelect, value}) => {
			if (onSelect) {
				const selected = ev.data;
				if (value.includes(selected)) {
					value.splice(value.indexOf(selected), 1)
				} else {
					value.push(selected)
				}
				onSelect(name, value);
			}
		}
	},

	render: function ({heading, value, onSelect, children, errors, selectedMessage, ...props}) {
		return (
			<div className={props.className}>
				<Heading>{heading}</Heading>
				<BodyText className={css.selected}>{selectedMessage} {value.join(', ')}</BodyText>
				<Dropdown
					title="Select"
					onSelect={onSelect}
					>
					{children}
				</Dropdown>
				<BodyText className={css.error}>{errors}</BodyText>
			</div>
		);
	}
});

export default MultiSelectInput;