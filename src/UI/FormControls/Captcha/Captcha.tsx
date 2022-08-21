import * as React from 'react';
import { FormFieldErrorType } from '../../../types/types';
import Field from '../Field/Field';
import classes from './Captcha.module.scss';

type PropsType = {
	register: any,
	captchaUrl: string | undefined,
	className?:string | null,
	error:  FormFieldErrorType | undefined,
}

const Captcha: React.FC<PropsType> = ({register, captchaUrl, className, error}) => {
	return (
		<div className={`${classes.Captcha} ${className}`}>
			<div className={classes.image}>
				<img src={captchaUrl} alt="captcha image" />
			</div>
			<Field error={error}>
				<input className={classes.input}
					type='text' {...register('captcha', {
						required: 'Captcha is required'
					})}
				/>
			</Field>
		</div>
	)
}

export default Captcha;
