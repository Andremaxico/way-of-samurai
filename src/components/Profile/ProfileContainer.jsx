import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
	useLocation,
	useNavigate,
	useParams,
 } from 'react-router-dom';
import Profile from './Profile';
import { toggleIsFetchingAC } from '../../Redux/users-reducer';
import { setUserProfileInfo, setMyProfileInfo } from '../../Redux/profile-reducer';
import axios from 'axios';

class ProfileContainer extends Component {
	componentDidMount() {
		this.props.toggleIsFetching(true);
		
		//if current user defined or header request data and set my id 
		if(this.props.router.params.userId || this.props.myProfileId) {
			axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${this.props.router.params.userId || this.props.myProfileId}`)
			.then(res => {
				this.props.setUserProfileInfo(res.data);
				this.props.toggleIsFetching(false);
			});
		}
	}

	componentDidUpdate() {
		if(!this.props.router.params.userId) {
			this.props.toggleIsFetching(true);

			axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${this.props.myProfileId}`)
			.then(res => {
				this.props.setUserProfileInfo(res.data);
			});
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
}

const withRouterProfileContainer = withRouter(ProfileContainer);

export default connect(mapStateToProps, methods)(withRouterProfileContainer);
