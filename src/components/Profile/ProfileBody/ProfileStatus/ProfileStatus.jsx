import React, { Component } from 'react'
import classes from '../ProfileBody.module.scss';
import { updateMyStatus } from '../../../../Redux/profile-reducer';
import { connect } from 'react-redux';

class ProfileStatus extends Component {
	state = {
		statusText: this.props.status,
		isEdit: false,
	}

	componentDidUpdate() {
		this.setState({
			statusText: this.props.status,
		});
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
				: <textarea className={classes.statusInput} autoFocus maxLength='300'
						onChange={ this.changeStatusText } onBlur={() => this.toggleEdding(false)}
					>{this.state.statusText}</textarea>
				}
			</div>
			
		)
	}
}


export default connect(null, {updateMyStatus})(ProfileStatus);