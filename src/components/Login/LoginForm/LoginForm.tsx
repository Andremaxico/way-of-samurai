import * as React from 'react';
import classes from './LoginForm.module.scss';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { login } from '../../../Redux/auth-reducer';
import Checkbox from '../../../UI/FormControls/Checkbox';
import Captcha from '../../../UI/FormControls/Captcha';
import { Navigate } from 'react-router-dom'
import Preloader from '../../../UI/Preloader';
import EmailField from '../../../UI/FormControls/Field/EmailField';
import PasswordField from '../../../UI/FormControls/Field/PasswordField';
import { LoginDataType } from '../../../types/types';
import { RootStateType } from '../../../Redux/redux-store';

type MapStateToPropsType = {
	isAuthed: boolean,
	captcha: string | null,
}
type MapDispatchToPropsType = {
	login: (data: LoginDataType) => any,
}

type PropsType = MapDispatchToPropsType & MapStateToPropsType;

type LoginFormValuesType = LoginDataType;

const LoginForm: React.FC<PropsType> = (props) => {
	const { 
		register, handleSubmit, setError, clearErrors, 
		formState: { errors, isValidating}
	} = useForm<LoginFormValuesType>();

	const [summaryError, setSummaryError] = React.useState<string | null>(null);

	const onSubmit = async (data: LoginFormValuesType) => {
		//login return error or null
		const err = await props.login(data);
		setSummaryError(err || null);
	}
	const clearSummaryError = () => setSummaryError(null);


	if(props.isAuthed) return <Navigate  to='/profile' replace/>
	if(isValidating) return <Preloader />

	return (
		<form action="#" className={classes.LoginForm} onSubmit={handleSubmit(onSubmit)}>
			<EmailField className={classes.inputWrapper} error={errors.email} register={register}/>
			<PasswordField className={classes.inputWrapper} error={errors.password} register={register}/>
			<Checkbox<keyof LoginFormValuesType>
				register={register}
				error={errors.rememberMe} name='rememberMe' labelText='Remember me'
			/>
			{props.captcha &&
				<Captcha 
					register={register} captchaUrl={props.captcha} 
					className={classes.captcha} error={errors.captcha}
				/>
			}
			<button className={classes.submitBtn} onClick={clearSummaryError}>Sumbit</button>
			{summaryError && <p className={classes.errorMessage}>{summaryError}</p>}
		</form>
	)
}

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
	return {
		isAuthed: state.auth.isAuthed,
		captcha: state.auth.captchaUrl,
	}
}

const mapDispatchToProps: MapDispatchToPropsType = {login};

export default connect<MapStateToPropsType, MapDispatchToPropsType>(mapStateToProps, mapDispatchToProps)(LoginForm);
