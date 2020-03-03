import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import React from 'react';
import Form from '../components/Form/Form'

const MainPanel = kind({
	name: 'Form',

	render: (props) => (
		<Panel {...props} >
			<Header type="compact" title="My Form"/>
			<Form/>
		</Panel>
	)
});

export default MainPanel;
