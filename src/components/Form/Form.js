import React, {Component} from 'react';
import BodyText from '@enact/moonstone/BodyText';
import { Row, Cell } from '@enact/ui/Layout';
import SubmitButton from '../SubmitButton/SubmitButton'
import TextInput from '../TextInput/TextInput';
import SelectInput from '../SelectInput/SelectInput';

import axios from 'axios';
import css from './Form.module.less';


class Form extends Component {
	constructor (props) {
		super(props);
		this.state = {
			data: {
				player: '',
				ui: '',
				username: '',
				password: '',
				videoId: '',
			},
			isSubmitting: false,
			isError: false
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange = (name, value) => {
		this.setState(prevState => ({
			data: {
				...prevState.data,
				[name]: value
			}
		}))
	}

	handleFormSubmit = (ev) => {
		ev.preventDefault();
		console.log(this.state.data)
		const data = this.state.data;

		this.setState({isSubmitting: true});

		axios.post(`https://jsonplaceholder.typicode.com/users`, { data })
		.then(res => {
			this.setState({isSubmitting: false});

			console.log(res);
			console.log(res.data);
		})

	}


	render () {
		return (
			<form className="form" onSubmit={this.handleFormSubmit}>
				<Row>
					<BodyText>
						Please complete the following form...
					</BodyText>
				</Row>

				<Row>
					<Cell>
						<SelectInput name='player' heading='Video Player' onSelect={this.handleChange}>
							{['AVPlay', 'DashJS', 'ExoPlayer', 'hls.js', 'HTML5', 'Shaka', 'WebMaf']}
						</SelectInput>

						<SelectInput name='ui' heading='UI' onSelect={this.handleChange}>
							{['DPlay', 'Eurosport', 'Motortrend']}
						</SelectInput>
					</Cell>
					<Cell>
						<TextInput name='videoId' heading='Video ID' value={this.state.data.videoId} onChange={this.handleChange} placeholder="Enter Video ID"/>

						<TextInput name='username' heading='Username' value={this.state.data.username} onChange={this.handleChange} placeholder="Enter Username"/>

						<TextInput name='password' heading='Password' value={this.state.data.password} onChange={this.handleChange} placeholder="Enter Password"/>
					</Cell>
				</Row>

				<Row>
					<Cell/>
					<Cell shrink>
						<SubmitButton isSubmitting={this.state.isSubmitting} handleFormSubmit={this.handleFormSubmit} />
					</Cell>
					<Cell/>
				</Row>
			</form>
		);
	}
}

export default Form;