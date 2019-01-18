import React, { Component, Fragment } from 'react';
import StepSummary from '../../../StepSummary';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal';
import Alert from 'react-s-alert';
import LoadingScreen from 'react-loading-screen';

import api from '../../../../services/api';

import {
	Container,
	Title,
	Subtitle,
	Area,
	Text,
	MyField as Field,
	GroupButton,
	Button,
	Label,
	Textarea
} from './styles';

Modal.setAppElement('#root');

class Summary extends Component {
	state = {
		overrule: false,
		modal: false,
		process: {},
		loading: false
	};

	async componentDidMount() {
		this.toggleLoading();
		const { match: { params: { id } } } = this.props;

		const process = await api.get(`internship/process/${id}`).then((res) => {
			this.toggleLoading();
			return res.data.process;
		});

		this.setState({ process });
	}

	toggleLoading = () => {
		const { loading } = this.state;
		this.setState({ loading: !loading });
	};

	openModal = (e) => {
		this.setState({ modal: true });
	};

	closeModal = (e) => {
		this.setState({ modal: false, overrule: false });
	};

	overrule = (e) => {
		e.preventDefault();
		this.setState({ overrule: true });
		this.openModal(e);
	};

	submit = (values) => {
		console.log('Values: ', values);
		const { history } = this.props;
		Alert.success('Resposta de aproveitamento reencaminhada!', {
			position: 'bottom-right',
			effect: 'slide'
		});
		history.push('/internship/moderator/explotation');
	};

	renderJustification() {
		return (
			<Label>
				Justificativa para indeferimento<span>*</span>
				<Textarea component="textarea" placeholder="Digite aqui..." name="justification" />
				<ErrorMessage name="justification" component="span" />
			</Label>
		);
	}

	renderHours() {
		return (
			<Area>
				<Text>
					Neste processo de aproveitamento de estágio são conferidos ao aluno
					<Field name="hours" type="number" min="0" /> horas comprovadas.
				</Text>
				<ErrorMessage name="hours" component="span" />
			</Area>
		);
	}

	getValidationSchema = () => {
		const { overrule } = this.state;
		return overrule
			? Yup.object().shape({
					hours: Yup.number(),
					justification: Yup.string()
						.min(10, 'Escreva uma justificativa com mais de 10 caracteres')
						.required('É obrigatório escrever uma justificativa')
				})
			: Yup.object().shape({
					hours: Yup.number()
						.integer('A quantidade de horas deve ser inteira')
						.positive('A quantidade de horas deve ser positiva'),
					justification: Yup.string()
				});
	};

	render() {
		const { process, overrule, modal, loading } = this.state;
		return (
			<Container>
				<LoadingScreen loading={loading} bgColor="#FFF" spinnerColor="#ED3B48" />
				<Title>Nome da Disciplina de Estágio</Title>
				<Subtitle>Semestre e ano de oferta</Subtitle>
				<StepSummary values={process} />
				<GroupButton>
					<Button secondary onClick={this.overrule}>
						Indeferir
					</Button>
					<Button primary onClick={this.openModal}>
						Deferir
					</Button>
				</GroupButton>
				<Modal
					isOpen={modal}
					onRequestClose={this.closeModal}
					contentLabel="Forneça os dados requiridos"
					style={{
						content: {
							width: 900,
							height: overrule ? 485 : 350,
							top: '50%',
							left: '50%',
							right: 'auto',
							bottom: 'auto',
							marginRight: '-50%',
							transform: 'translate(-50%, -50%)'
						}
					}}
				>
					<Formik
						onSubmit={this.submit}
						initialValues={{
							hours: 0,
							justification: ''
						}}
						validationSchema={this.getValidationSchema}
					>
						<Form>
							<Subtitle ref={(subtitle) => (this.subtitle = subtitle)}>
								Preencha a{' '}
								{overrule ? 'justificativa para indeferimento' : 'quantidade de horas aproveitadas'}
							</Subtitle>
							{overrule ? this.renderJustification() : this.renderHours()}
							<GroupButton>
								<Button secondary onClick={this.closeModal}>
									Cancelar
								</Button>
								<Button primary type="submit">
									Salvar
								</Button>
							</GroupButton>
						</Form>
					</Formik>
				</Modal>
			</Container>
		);
	}
}

export default Summary;
