import React from 'react';
import classes from './LoginForm.module.scss';
import { Field, reduxForm } from 'redux-form';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { login } from '../../../Redux/auth-reducer';

const LoginForm = (props) => {
	const { register, handleSubmit, watch, formState: { errors } } = useForm();
   const onSubmit = data => props.login({...data, captcha: false});

	return (
		<form action="#" className={classes.LoginForm} onSubmit={ handleSubmit(onSubmit) }>
			<div className={classes.inputWrapper}>
				<input 
					type="email" className={classes.input} 
					placeholder='Email' {...register('email', {required: true})}
				/>
			</div>
			<div className={classes.inputWrapper}>
				<input 
					type="password" className={classes.input} 
					placeholder='Password' {...register('password', {required: true})}
				/>
			</div>
			<div className={classes.checkbox}>
				<input type="checkbox" id='checkbox' className={classes.checkboxInput} {...register('rememberMe')}/>
				<label htmlFor="checkbox">Remember me</label>
			</div>
			<button className={classes.submitBtn}>Sumbit</button>
		</form>
	)
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

export default connect(null, {login})(LoginReduxForm);
