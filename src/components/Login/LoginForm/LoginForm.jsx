import React from 'react';
import classes from './LoginForm.module.scss';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { login } from '../../../Redux/auth-reducer';
import Field, { PasswordField, EmailField } from '../../../UI/FormControls/Field/Field';
import Checkbox from '../../../UI/FormControls/Checkbox';
import { Navigate } from 'react-router-dom'
import Preloader from '../../../UI/Preloader';

const LoginForm = (props) => {
	const { 
		register, handleSubmit, setError, clearErrors, 
		formState: { errors, isSubmitSuccessful,isValidating } 
	} = useForm();

	const onSubmit = async data => {
		//login return error or
		const err = await props.login({...data, captcha: false});
		if(err) {
			setError('summary', {
				type: 'custom',
				message: err,
			})
		} else {
			clearErrors('summary');
		}
	}

	const handleFormChange = () => {
		if(errors.summary) clearErrors('summary');
	};


	if(props.isAuthed) return <Navigate  to='/profile' replace/>
	if(isValidating) return <Preloader />

	return (
		<form action="#" className={classes.LoginForm} onChange={ handleFormChange } onSubmit={ handleSubmit(onSubmit) }>
			<EmailField className={classes.inputWrapper} error={errors.email} register={register}/>
			<PasswordField className={classes.inputWrapper} error={errors.password} register={register}/>
			<Checkbox 
				register={register}
				error={errors.rememberMe} name='rememberMe' labelText='Remember me'
			/>
			<button className={classes.submitBtn}>Sumbit</button>
			{errors.summary && <p className={classes.errorMessage}>{errors.summary.message}</p>}
		</form>
	)
}

const mapStateToProps = (state) => {
	return {
		isAuthed: state.auth.data.isAuthed,
	}
}

export default connect(mapStateToProps, {login})(LoginForm);
