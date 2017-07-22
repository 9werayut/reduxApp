//React
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

//REACT-ROUTER
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';

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
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';

const Routes = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={BooksList}/>
				<Route path="/admin" component={BooksForm} />
				<Route path="/cart" component={Cart} />
			</Route>
		</Router>
	</Provider>
);

render(
	Routes, document.getElementById('app')
)

//Step2 create and dispatch actions
// store.dispatch(postBooks(
//
// ))
