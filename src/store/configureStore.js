import { createStore, combineReducers, applyMiddleware } from 'redux'; 
import reduxThunk from 'redux-thunk';
import moment from 'moment';
import usersReducer from '../reducers/users'; // usersReducer
import timeReducer from '../reducers/timeEntries';
import calReducer from '../reducers/calendar';
import datesReducer from '../reducers/dates';

export default () => {

    console.log('Configuring store...');
    const store = createStore(
        combineReducers({
            users: usersReducer,
            timeEntries: timeReducer,
            cal: calReducer,
            searchDates: datesReducer
        }),
        {
            users: [],
            timeEntries: [],
            cal: [],
            searchDates: {
                startDate: moment().subtract(2, 'weeks'),
                endDate: moment()
            }
        },
        applyMiddleware(reduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    
    return store;
};