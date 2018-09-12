import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './store/configureStore';

const store = configureStore();
console.log('Store configured!');
console.log('Initial Store: ', store.getState());
store.subscribe(() => {
    console.log('Store Updated: ', store.getState());
});

console.log('Rendering app...');
const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
console.log('App rendered!');

