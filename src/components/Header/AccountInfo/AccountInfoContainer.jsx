import React, { Component } from 'react';
import AccountInfo from './AccountInfo';
import { connect } from 'react-redux';

class AccountInfoContainer extends Component {
	render() {
		return (
			<AccountInfo login={this.props.authData.login} 
			avatarUrl={this.props.authData.photos ? this.props.authData.photos.small : ''}/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authData: state.auth.data,
	}
}

export default connect(mapStateToProps)(AccountInfoContainer);
