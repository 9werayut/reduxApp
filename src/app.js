//React
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

//Redux
import { createStore, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';


//import combine reducers
import reducers from './reducers';

//import actions
import { addToCart } from './actions/cartActions';
import { postBooks, deleteBooks, updateBooks } from './actions/bookActions';

//create the store
const middleware = applyMiddleware(createLogger());
const store = createStore(reducers, middleware);


import BooksList from './components/pages/booksList';
import Menu from './components/menu';
import Footer from './components/footer';

render(
	<Provider store={store}>
		<div>
			<Menu />
			<BooksList />
			<Footer />
		</div>
	</Provider>, document.getElementById('app')
)

//Step2 create and dispatch actions
// store.dispatch(postBooks(
//
// ))
