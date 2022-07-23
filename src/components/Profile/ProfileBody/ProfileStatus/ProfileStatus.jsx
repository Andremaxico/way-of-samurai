import React, { Component } from 'react'
import classes from '../ProfileBody.module.scss';

class ProfileStatus extends Component {
	state = {
		statusText: this.props.status,
		isEdit: false,
	}

	toggleEdding = (value) => {
		this.setState({
			isEdit: value,
		})
	}

	changeStatusText = (event) => {
		this.setState({
			statusText: event.target.value,
		});
	}
	
	render() {
		return (
			<div className={classes.profileStatus}>
				{!this.state.isEdit 
				? <p className={classes.statusText} onClick={() => this.toggleEdding(true)}>
						{this.state.statusText || <i className={classes.defaultStatus}>no info</i>}
					</p>
				: <textarea className={classes.statusInput} autoFocus maxLength='300'
						onChange={ this.changeStatusText } onBlur={() => this.toggleEdding(false)}
					>{this.state.statusText}</textarea>
				}
			</div>
			
		)
	}
}

export default ProfileStatus;