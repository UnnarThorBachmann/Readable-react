import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux';
import rootreducer from './reducers';
import Error from './components/error.js';

const store = createStore(rootreducer,
                         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
ReactDOM.render(<BrowserRouter>
	<Provider store={store}>
		<App/>
	</Provider>
	</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
