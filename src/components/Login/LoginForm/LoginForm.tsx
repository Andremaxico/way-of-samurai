import * as React from 'react';
import classes from './LoginForm.module.scss';
import { useForm } from "react-hook-form";
import { connect, useDispatch, useSelector } from 'react-redux';
import { login } from '../../../Redux/auth-reducer';
import Checkbox from '../../../UI/FormControls/Checkbox';
import Captcha from '../../../UI/FormControls/Captcha';
import { Navigate } from 'react-router-dom'
import Preloader from '../../../UI/Preloader';
import EmailField from '../../../UI/FormControls/Field/EmailField';
import PasswordField from '../../../UI/FormControls/Field/PasswordField';
import { LoginDataType } from '../../../types/types';
import { selectCaptcha, selectIsAuthed, selectLoginError } from '../../../Redux/auth-selectors';
import { AnyAction } from 'redux';

type PropsType = {};

type LoginFormValuesType = LoginDataType;

const LoginForm: React.FC<PropsType> = React.memo((props) => {
	const isAuthed = useSelector(selectIsAuthed);
	const captcha = ''// useSelector(selectCaptcha);
	const loginError = useSelector(selectLoginError);

	const dispatch = useDispatch();
	const loginToProfile = async (data: LoginDataType) => {
		await dispatch(login(data) as unknown as AnyAction);
	}

	const { 
		register, handleSubmit, formState: { errors, isValidating, isSubmitting}
	} = useForm<LoginFormValuesType>();

	const [summaryError, setSummaryError] = React.useState<string | null>(null);
	console.log('form rerender');

	const onSubmit = async (data: LoginFormValuesType) => {
		//login dispatch error or null
		await loginToProfile(data);
		setSummaryError(loginError);
		console.log('sum error: ', summaryError);
		console.log('login error: ', loginError);
	}


	if(isAuthed) return <Navigate  to='/profile' replace/>
	if(isSubmitting || isValidating) return <Preloader />

	return (
		<form action="#" className={classes.LoginForm} onSubmit={handleSubmit(onSubmit)}>
			<EmailField className={classes.inputWrapper} error={errors.email} register={register}/>
			<PasswordField className={classes.inputWrapper} error={errors.password} register={register}/>
			<Checkbox<keyof LoginFormValuesType>
				register={register}
				error={errors.rememberMe} name='rememberMe' labelText='Remember me'
			/>
			{captcha &&
				<Captcha 
					register={register} captchaUrl={captcha} 
					className={classes.captcha} error={errors.captcha}
				/>
			}
			<button className={classes.submitBtn}>Sumbit</button>
			{summaryError && <p className={classes.errorMessage}>{summaryError}</p>}
		</form>
	)
});

export default LoginForm;
