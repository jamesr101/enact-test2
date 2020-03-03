import React from 'react';
import Button from '@enact/moonstone/Button';
import Spinner from '@enact/moonstone/Spinner';
import kind from '@enact/core/kind';
import css from './SubmitButton.module.less';

const SubmitButton = kind({
	name: 'SubmitButton',

	styles: {
		css,
		className: 'buttonContainer'
	},

	render: function ({isSubmitting, handleFormSubmit, ...props}) {
		return (
			<div className={props.className}>
				<Button size='large' type="submit" onClick={handleFormSubmit}>Submit Form</Button>
				{isSubmitting && <Spinner className={css.ajaxSpinner}/>}
			</div>
		);
	}
});

export default SubmitButton;