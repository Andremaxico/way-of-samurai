import ProfileBody from "./ProfileBody";
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		profileInfo: state.profilePage.profileInfo,
	}
}

const ProfileBodyContainer = connect(mapStateToProps)(ProfileBody);

export default ProfileBodyContainer;