import React, { Component } from 'react'
import Header from './Header';
import { setAuthData } from '../../Redux/authReducer';
import { connect } from 'react-redux';

class HeaderContainer extends Component {
	componentDidMount() {
		this.props.setAuthData();
	}

	render() {
		return (
			<Header {...this.props} />
		)
	}
}

const methods = {
	setAuthData,
}

const mapStateToProps = (state) => {
	return {
		isAuthed: state.auth.isAuthed,
	}
}

export default connect(mapStateToProps, methods)(HeaderContainer);
