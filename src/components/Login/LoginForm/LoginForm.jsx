import React from 'react';
import classes from './LoginForm.module.scss';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { login } from '../../../Redux/auth-reducer';
import Field, { PasswordField, EmailField } from '../../../UI/FormControls/Field/Field';
import Checkbox from '../../../UI/FormControls/Checkbox';
import Captcha from '../../../UI/FormControls/Captcha';
import { Navigate } from 'react-router-dom'
import Preloader from '../../../UI/Preloader';

const LoginForm = (props) => {
	const { 
		register, handleSubmit, setError, clearErrors, 
		formState: { errors, isSubmitSuccessful,isValidating } 
	} = useForm();

	const onSubmit = async data => {
		//login return error or null
		const err = await props.login({...data});
		console.log(err);
		if(err) {
			setError('summary', {
				type: 'custom',
				message: err,
			})
		}
	}
	const clearSummaryError = () => {
		if(errors.summary) clearErrors('summary');
	}


	if(props.isAuthed) return <Navigate  to='/profile' replace/>
	if(isValidating) return <Preloader />

	return (
		<form action="#" className={classes.LoginForm} onSubmit={handleSubmit(onSubmit)}>
			<EmailField className={classes.inputWrapper} error={errors.email} register={register}/>
			<PasswordField className={classes.inputWrapper} error={errors.password} register={register}/>
			<Checkbox 
				register={register}
				error={errors.rememberMe} name='rememberMe' labelText='Remember me'
			/>
			{props.captcha &&
				<Captcha register={register} captchaUrl={props.captcha} className={classes.captcha} />
			}
			<button className={classes.submitBtn} onClick={clearSummaryError}>Sumbit</button>
			{errors.summary && <p className={classes.errorMessage}>{errors.summary.message}</p>}
		</form>
	)
}

const mapStateToProps = (state) => {
	return {
		isAuthed: state.auth.data.isAuthed,
		captcha: state.auth.captchaUrl,
	}
}

export default connect(mapStateToProps, {login})(LoginForm);
