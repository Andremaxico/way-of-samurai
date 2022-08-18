import React from 'react'
import Field from '../Field/Field';
import classes from './Captcha.module.scss';

const Captcha = ({register, captchaUrl, className}) => {
	return (
		<div className={`${classes.Captcha} ${className}`}>
			<div className={classes.image}>
				<img src={captchaUrl} alt="captcha image" />
			</div>
			<Field>
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
