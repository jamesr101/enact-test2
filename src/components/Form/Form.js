import React, {Component} from 'react';
import BodyText from '@enact/moonstone/BodyText';
import { Row, Cell } from '@enact/ui/Layout';
import SubmitButton from '../SubmitButton/SubmitButton'
import TextInput from '../TextInput/TextInput';
import SelectInput from '../SelectInput/SelectInput';
import MultiSelectInput from '../MultiSelectInput/MultiSelectInput';
import Spotlight from '@enact/spotlight';

import axios from 'axios';
import styles from './Form.module.less';


class Form extends Component {
	constructor (props) {
		super(props);
		this.state = {
			data: {
				player: [],
				ui: '',
				username: '',
				password: '',
				videoId: '',
				realm: '',
				realmText: ''
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
					value.length > 0
							? ''
							: 'Please select at least one Player';
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
				case 'realmText':
					validationErrors[name] =
						value
							? ''
							: 'Please enter a Realm or select an option above';
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

	isDataValid = () => {
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

	formatData = (data) => {
		const formatedData = Object.assign({}, data);

		if ( formatedData.realm === 'Other') {
			formatedData.realm = formatedData.realmText;
		}

		delete formatedData.realmText;

		return formatedData
	}

	handleFormSubmit = (ev) => {
		ev.preventDefault();
		const data = this.formatData(this.state.data);
		console.log(data);

		if(this.isDataValid()) {
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

	handleSpotlightEndOfColumn = (ev) => {
		ev.preventDefault();
		ev.stopPropagation();
		Spotlight.focus('[spottable-id="columnStart"]');
	}


	render () {
		const {data, isSubmitting, isErrorResponse, validationErrors} = this.state;

		const showRealmTextInput = (data.realm === 'Other');

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
						<MultiSelectInput value={data.player} name='player' heading='Video Player' onSelect={this.handleChange} errors={validationErrors.player}>
							{['AVPlay', 'DashJS', 'ExoPlayer', 'hls.js', 'HTML5', 'Shaka', 'WebMaf']}
						</MultiSelectInput>

						<SelectInput name='ui' heading='UI' onSelect={this.handleChange} errors={validationErrors.ui}>
							{['DPlay', 'Eurosport', 'Motortrend']}
						</SelectInput>

						<SelectInput
						name='realm'
						heading='Realm'
						value={data.realm}
						onSelect={this.handleChange}
						errors={validationErrors.realm}
						onSpotlightRight={this.handleSpotlightEndOfColumn}
						>
						{['Realm 1', 'Realm 2', 'Realm 3', 'Other']}
						</SelectInput>

						{
							showRealmTextInput &&
								<TextInput
								name='realmText'
								value={data.realmText}
								onChange={this.handleChange}
								placeholder="Enter a Realm"
								errors={validationErrors.realmText}
								onSpotlightRight={this.handleSpotlightEndOfColumn}
								/>
						}

					</Cell>
					<Cell>
						<TextInput
						name='videoId'
						heading='Video ID'
						value={data.videoId}
						onChange={this.handleChange}
						placeholder="Enter Video ID"
						errors={validationErrors.videoId}

						spottableId='columnStart'
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