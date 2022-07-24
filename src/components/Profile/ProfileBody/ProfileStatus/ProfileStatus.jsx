import React, { Component } from 'react'
import classes from '../ProfileBody.module.scss';

class ProfileStatus extends Component {
	state = {
		statusText: this.props.status || '',
		isEdit: false,
	}

	componentDidUpdate(prevProps) {
		//if status changed
		if(this.props.status != prevProps.status) {
			this.setState({
				statusText: this.props.status,
			});
		}
	}

	toggleEdding = (value) => {
		//if edding end
		if(!value) {
			if(this.state.statusText != this.props.status) {
				this.props.updateMyStatus(this.state.statusText);
			}
		}
		this.setState({
			isEdit: value,
		})
	}

	changeStatusText = (event) => {
		const newValue = event.target.value;
		this.setState({
			statusText: newValue,
		});
	}
	
	render() {
		return (
			<div className={classes.profileStatus}>
				{!this.state.isEdit 
				? <p className={classes.statusText} onClick={() => this.toggleEdding(true)}>
						{this.state.statusText || <i className={classes.defaultStatus}>no info</i>}
					</p>
				: <textarea className={classes.statusInput} autoFocus maxLength='300' value={this.state.statusText}
						onChange={ this.changeStatusText } onBlur={() => this.toggleEdding(false)}
					></textarea>
				}
			</div>
			
		)
	}
}


export default ProfileStatus;