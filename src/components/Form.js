import React, {Component} from 'react';
import BodyText from '@enact/moonstone/BodyText';
import Button from '@enact/moonstone/Button';
import Dropdown from '@enact/moonstone/Dropdown';
import Heading from '@enact/moonstone/Heading';
import Input from '@enact/moonstone/Input';
import Spinner from '@enact/moonstone/Spinner';
import { Row, Cell } from '@enact/ui/Layout';

import axios from 'axios';


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

	handleChange = (name, ev) => {
		this.setState(prevState => ({
			data: {
				...prevState.data,
				[name]: ev.value
			}
		}))
	}

	handleSelect = (name, ev) => {
		this.setState(prevState => ({
			data: {
				...prevState.data,
				[name]: ev.data
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
			<form onSubmit={this.handleFormSubmit}>
				<Row>
					<BodyText>
						Please complete the following form...
					</BodyText>
				</Row>
				<Row>
					<Cell>

						<Heading>Video Player</Heading>
						<Dropdown
							title="Select"
							onSelect={(ev)=>this.handleSelect('player', ev)}
							>
							{['AVPlay', 'DashJS', 'ExoPlayer', 'hls.js']}
						</Dropdown>
						<Heading>UI</Heading>
						<Dropdown
							title="Select"
							onSelect={(ev)=>this.handleSelect('ui', ev)}
							>
							{['DPlay', 'Eurosport', 'Motortrend']}
						</Dropdown>

					</Cell>
					<Cell>
						<Heading>Video ID</Heading>
						<Input value={this.state.data.videoId} onChange={(ev)=>this.handleChange('videoId', ev)} placeholder="Enter Video ID" />
						<Heading>Username</Heading>
						<Input value={this.state.data.username} onChange={(ev)=>this.handleChange('username', ev)} placeholder="Enter Username" />
						<Heading>Password</Heading>
						<Input type='password' value={this.state.data.password} onChange={(ev)=>this.handleChange('password', ev)} placeholder="Enter Password" />

					</Cell>
				</Row>

				<Row>
					<Cell/>
					<Cell shrink>
						<Button size='large' type="submit" onClick={this.handleFormSubmit}>Submit Form</Button>
						{this.state.isSubmitting && <Spinner />}
					</Cell>
					<Cell/>
				</Row>

			</form>
		);
	}
}

export default Form;