import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
	useLocation,
	useNavigate,
	useParams,
 } from 'react-router-dom';
import Profile from './Profile';
import { toggleIsFetchingAC } from '../../Redux/users-reducer';
import { getUserById } from '../../Redux/profile-reducer';
import { setUserProfileInfo, setMyProfileInfo } from '../../Redux/profile-reducer';

class ProfileContainer extends Component {
	componentDidMount() {
		let userId = this.props.router.params.userId || this.props.myProfileId;
		//if current user defined or header request data and set my id 
		if(userId) {
			this.props.getUserById(userId);
			this.props.toggleIsFetching(false);
		}
	}

	componentDidUpdate() {
		if(!this.props.router.params.userId) {
			this.props.getUserById(this.props.myProfileId);
		}
	}

	render() {
		return (
			<Profile currUserProfileInfo={this.props.currUserProfileInfo}/>
		)
	}
}

function withRouter(Component) {
	function ComponentWithRouterProp(props) {
	  let location = useLocation();
	  let navigate = useNavigate();
	  let params = useParams();
	  return (
		 <Component
			{...props}
			router={{ location, navigate, params }}
		 />
	  );
	}
 
	return ComponentWithRouterProp;
}
 
const mapStateToProps = (state) => {
	return {
		currUserProfileInfo: state.profilePage.currUserProfileInfo,
		myProfileId: state.auth.data.id,
	}
}
const methods = {
	toggleIsFetching: toggleIsFetchingAC,
	setUserProfileInfo,
	setMyProfileInfo,
	getUserById,
}

const withRouterProfileContainer = withRouter(ProfileContainer);

export default connect(mapStateToProps, methods)(withRouterProfileContainer);
