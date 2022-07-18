import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
	useLocation,
	useNavigate,
	useParams,
 } from 'react-router-dom';
import Profile from './Profile';
import { toggleIsFetchingAC } from '../../Redux/users-reducer';
import { setUserProfileInfo } from '../../Redux/profile-reducer';
import axios from 'axios';

class ProfileContainer extends Component {
	componentDidMount() {
		this.props.toggleIsFetching(true);
	axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${this.props.router.params.userId || 2}`)
			.then(res => {
				this.props.setUserProfileInfo(res.data);
			});
	}

	render() {
		return (
			<Profile {...this.props}/>
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
		myProfileInfo: state.profilePage.myProfileInfo,
	}
}
const methods = {
	toggleIsFetching: toggleIsFetchingAC,
	setUserProfileInfo,
}

const withRouterProfileContainer = withRouter(ProfileContainer);

export default connect(mapStateToProps, methods)(withRouterProfileContainer);
