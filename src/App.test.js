import SamuraiApp from "./App";
import ReactDOM from 'react-dom';
import store from './Redux/redux-store';

it('test render app without crashing', () => {
	const div = document.createElement('div');
  	ReactDOM.render(<SamuraiApp store={store}/>, div);
	ReactDOM.unmountComponentAtNode(div);
});

