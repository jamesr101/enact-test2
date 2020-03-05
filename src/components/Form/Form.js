import React, {Component} from 'react';
import BodyText from '@enact/moonstone/BodyText';
import { Row, Cell } from '@enact/ui/Layout';
import SubmitButton from '../SubmitButton/SubmitButton'
import TextInput from '../TextInput/TextInput';
import SelectInput from '../SelectInput/SelectInput';

import axios from 'axios';
import styles from './Form.module.less';


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
				realm: '',
			},
			validationErrors: {
				player: '',
				ui: '',
				username: '',
				password: '',
				videoId: '',
				realm: '',
			},
			isSubmitting: false,
			isErrorResponse: false
		};

		this.handleChange = this.handleChange.bind(this);
	}

	validateData = () => {
		const {validationErrors, data} = this.state;

		Object.keys(data).forEach( name => {
			const value = data[name];
			switch (name) {
				case 'player':
					validationErrors[name] =
						value
							? ''
							: 'Please select a Player';
					break;
				case 'ui':
					validationErrors[name] =
						value
							? ''
							: 'Please select a UI';
					break;
				case 'videoId':
					validationErrors[name] =
						value
							? ''
							: 'Please enter a Video ID';
					break;
				case 'username':
					validationErrors[name] =
						value
							? ''
							: 'Please enter a Username';
					break;
				case 'realm':
					validationErrors[name] =
						value
							? ''
							: 'Please select a Realm';
					break;

				default:
					break;
			}

		})

		this.setState({
			validationErrors: validationErrors
		})

		return validationErrors
	}

	isDataValide = () => {
		const validationErrors = this.validateData()

		const allValid = Object.keys(validationErrors).every(function(i) {
			return !validationErrors[i].length
		});

		return allValid
	}

	handleChange = (name, value) => {

		this.setState(prevState => ({
			data: {
				...prevState.data,
				[name]: value
			},
			validationErrors: {
				...prevState.validationErrors,
				[name]: ''
			}
		}))
	}

	handleFormSubmit = (ev) => {
		ev.preventDefault();
		console.log(this.state.data)
		const data = this.state.data;

		if(this.isDataValide()) {
			this.setState({
				isSubmitting: true,
				isErrorResponse: false
			});

			axios.post(`https://jsonplaceholder.typicode.com/users`, { data })
			.then(res => {
				this.setState({isSubmitting: false});

				console.log(res);
				console.log(res.data);
			})
			.catch((err) => {
				this.setState({
					isSubmitting: false,
					isErrorResponse: true
				})

				console.log(err)
			});
		}
	}


	render () {
		const {data, isSubmitting, isErrorResponse, validationErrors} = this.state;

		return (
			<form className={styles.form} onSubmit={this.handleFormSubmit}>
				<Row>
					{isErrorResponse && <BodyText className={styles.error}>There was an Error, please try again</BodyText>}
				</Row>
				<Row>
					<BodyText>
						Please complete the following form...
					</BodyText>
				</Row>

				<Row>
					<Cell>
						<SelectInput name='player' heading='Video Player' onSelect={this.handleChange} errors={validationErrors.player}>
							{['AVPlay', 'DashJS', 'ExoPlayer', 'hls.js', 'HTML5', 'Shaka', 'WebMaf']}
						</SelectInput>

						<SelectInput name='ui' heading='UI' onSelect={this.handleChange} errors={validationErrors.ui}>
							{['DPlay', 'Eurosport', 'Motortrend']}
						</SelectInput>

						<TextInput
						name='realm'
						heading='Realm'
						value={data.realm}
						onChange={this.handleChange}
						placeholder="Enter a Realm"
						errors={validationErrors.realm}
						/>
					</Cell>
					<Cell>
						<TextInput
						name='videoId'
						heading='Video ID'
						value={data.videoId}
						onChange={this.handleChange}
						placeholder="Enter Video ID"
						errors={validationErrors.videoId}
						/>

						<TextInput
						name='username'
						heading='Username'
						value={data.username}
						onChange={this.handleChange}
						placeholder="Enter Username"
						errors={validationErrors.username}
						/>

						<TextInput
						name='password'
						heading='Password'
						value={data.password}
						onChange={this.handleChange}
						placeholder="Enter Password"
						errors={validationErrors.password}
						/>
					</Cell>
				</Row>

				<Row>
					<Cell/>
					<Cell shrink>
						<SubmitButton isSubmitting={isSubmitting} handleFormSubmit={this.handleFormSubmit} />
					</Cell>
					<Cell/>
				</Row>
			</form>
		);
	}
}

export default Form;