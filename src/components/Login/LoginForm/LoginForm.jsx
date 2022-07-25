import React from 'react';
import classes from './LoginForm.module.scss';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { login } from '../../../Redux/auth-reducer';
import Field, { PasswordField } from '../../../UI/FormControls/Field/Field';
import Checkbox from '../../../UI/FormControls/Checkbox';
import { Navigate } from 'react-router-dom'

const LoginForm = (props) => {
	const { register, handleSubmit, watch, formState: { errors } } = useForm();
   const onSubmit = data => props.login({...data, captcha: false});

	if(props.isAuthed) return <Navigate  to='/profile' replace/>

	return (
		<form action="#" className={classes.LoginForm} onSubmit={ handleSubmit(onSubmit) }>
			<Field className={classes.inputWrapper} error={errors.email}>
				<input 
					type="email" className={classes.input} 
					placeholder='Email' {...register('email', {
						required: 'This field is required',
					})}
				/>
			</Field>
			<PasswordField className={classes.inputWrapper} error={errors.password} register={register}/>
			<Checkbox 
				register={register} validation={{required: true}} 
				error={errors.rememberMe} name='rememberMe' labelText='Remember me'
			/>
			<button className={classes.submitBtn}>Sumbit</button>
		</form>
	)
}

const mapStateToProps = (state) => {
	return {
		isAuthed: state.auth.data.isAuthed,
	}
}

export default connect(mapStateToProps, {login})(LoginForm);
