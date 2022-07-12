import React from 'react';
import Navigation from './Navigation';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		linksData: state.sidebar.linksData
	}
}

const NavigationContainer = connect(mapStateToProps)(Navigation);

export default NavigationContainer; 