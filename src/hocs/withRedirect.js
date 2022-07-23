import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const redirectMapStateToProps = (state) => {
	return { 
		isAuthed: state.auth.isAuthed,
		myProfileId: state.profilePage.myProfileData.userId,
		currUserProfileId: state.profilePage.currentUserProfileData.userId,
	}
}

const withAuthRedirect = (Component) => connect(redirectMapStateToProps)((props) => {
	if(!props.isAuthed) return <Navigate to='/login' replace/>

	return <Component {...props}/>
});

export default withAuthRedirect;