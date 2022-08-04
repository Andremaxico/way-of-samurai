import React from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import Checkbox from '../../../UI/FormControls/Field/Checkbox/Checkbox';
import { EmailField, PasswordField } from '../../../UI/FormControls/Field/Field';
import Preloader from '../../../UI/Preloader';
import classes from './LoginForm.module.scss';

const LoginForm = (props) => {
	console.log(props.isAuthed);
	const { handleSubmit, formState: { errors, isSubmitting }, register, setError, clearErrors} = useForm();
	const onSubmit = async (data) => {
		const err =  await props.login({...data, captcha: false});

		if(err) {
			setError('loginError', {
				type: 'custom',
				message: err,
			});
		} else {
			clearErrors('loginError');
		}
	};
	
	if(props.isAuthed) return <Navigate to='/profile' replace/>
	if(isSubmitting) return <Preloader />

	const clearError = () => {
		if(errors.loginError) clearErrors('loginError');
	} 

	return (
		<form className={classes.LoginForm} onChange={clearError} onSubmit={handleSubmit(onSubmit)}>
			<EmailField className={classes.input} name='email' register={register} error={errors.email}/>
			<PasswordField className={classes.input} name='password' register={register} error={errors.password}/>
			<Checkbox 
				validation={{required: 'this field is required'}} register={register}
				name='rememberMe' error={errors.rememberMe} labelText='Remember me' className={classes.rememberMe}
			/>
			<button className={classes.submitBtn}>Submit</button>
			<p className={classes.errorMessage}>{errors?.loginError?.message}</p>
		</form> 
	)
}

export default LoginForm;
