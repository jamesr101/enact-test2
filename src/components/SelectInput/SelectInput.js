import React from 'react';
import kind from '@enact/core/kind';
import css from './SelectInput.module.less';
import Heading from '@enact/moonstone/Heading';
import Dropdown from '@enact/moonstone/Dropdown';
import BodyText from '@enact/ui/BodyText/BodyText';
import PropTypes from 'prop-types';

const SelectInput = kind({
	name: 'SelectInput',

	propTypes: {
		heading: PropTypes.string,
		onSelect: PropTypes.func,
		children: PropTypes.node,
		errors: PropTypes.string
	},

	styles: {
		css,
		className: 'selectInput'
	},

	handlers: {
		onSelect: (ev, {name, onSelect}) => {
			if (onSelect) {
				onSelect(name, ev.data);
			}
		}
	},

	render: function ({heading, onSelect, children, errors, ...props}) {
		return (
			<div className={props.className}>
				<Heading>{heading}</Heading>
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

export default SelectInput;