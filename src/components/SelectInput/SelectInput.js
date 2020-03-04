import React from 'react';
import kind from '@enact/core/kind';
import css from './SelectInput.module.less';
import Heading from '@enact/moonstone/Heading';
import Dropdown from '@enact/moonstone/Dropdown';

const SelectInput = kind({
	name: 'SelectInput',

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

	render: function ({heading, onSelect, children, ...props}) {
		return (
			<div className={props.className}>
				<Heading>{heading}</Heading>
				<Dropdown
					title="Select"
					onSelect={onSelect}
					>
					{children}
				</Dropdown>
			</div>
		);
	}
});

export default SelectInput;