/*************************************
 *  USERS LIST
 *  import UsersList
 *  used in: App
 *************************************/ 

import React from 'react';
import { connect } from 'react-redux'; // connects a component to the redux store
import Spinner from 'react-loading-overlay';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import User from './User';
import UsersSummary from './UsersSummary';
import { selectUsers } from '../selectors/users';
import { getUsers, determineMissingDates } from '../actions/users';
import { getTimeEntries } from '../actions/timeEntries';
import { getCalEntries, getCalToken } from '../actions/calendar';
import { setStartDate, setEndDate } from '../actions/dates';
import '../styles/styles.css';
import 'react-dates/lib/css/_datepicker.css';

class UsersList extends React.Component { // unconnected component - exported so we can test it
    state = {
            loading: false,
            startCalendarFocused: null,
            endCalendarFocused: null
    };

    onStartDateChange = (startDate) => {
        this.props.setStartDate(startDate);
    };
    onEndDateChange = (endDate) => {
        this.props.setEndDate(endDate);
    };
    onStartFocusChange = ({ focused }) => {
        this.setState(() => ({ startCalendarFocused: focused }));
    };
    onEndFocusChange = ({ focused }) => {
        this.setState(() => ({ endCalendarFocused: focused }));
    };
    onGetUsers = () => {
        this.setState(() => ({ loading: true }));
        this.props.getUsers((users) => {
            this.props.getTimeEntries(users, this.props.searchDates, () => {
                this.props.getCalToken((token) => {
                    this.props.getCalEntries(users, this.props.searchDates, token, () => {
                        this.props.determineMissingDates(this.props.users, this.props.timeEntries, this.props.cal, this.props.searchDates, () => {
                            this.setState(() => ({ loading: false }));
                        });
                    });
                });
            });
        });
    };

    render() {
        return (
            <div className="container">
                <div className="widget-header">
                    {this.props.componentName}
                </div>        
                <Spinner active={this.state.loading} spinner text='Retrieving data from Harvest and Google Calendar...'>
                    <div className="container__centered">
                            <div>
                                <SingleDatePicker
                                    date={this.props.searchDates.startDate}
                                    onDateChange={this.onStartDateChange}
                                    focused={this.state.startCalendarFocused}
                                    onFocusChange={this.onStartFocusChange}
                                    numberOfMonths={1}
                                    isOutsideRange={() => {false}}
                                />
                                <label className="widget__message"> __ </label>
                                <SingleDatePicker
                                    date={this.props.searchDates.endDate}
                                    onDateChange={this.onEndDateChange}
                                    focused={this.state.endCalendarFocused}
                                    onFocusChange={this.onEndFocusChange}
                                    numberOfMonths={1}
                                    isOutsideRange={() => {false}}
                                />
                            </div> 
                            <div>
                                {this.props.searchDates.startDate.isBefore(this.props.searchDates.endDate) ? <button className="button" onClick={this.onGetUsers}>RUN QUERY</button> : <span className="error">End date must be later than Start date</span>}                            
                            </div>                                                                             
                    </div>
                    <UsersSummary />
                    <div className="widget">
                        {
                            this.props.users.length === 0 ? ( 
                                <div className="widget__message">
                                    No results.
                                </div>
                            ) : (
                                this.props.users.filter((user) => user.missingDates.length > 0).map((user) => <User key={user.id} {...user} />)
                            )
                        }
                    </div>
                </Spinner>               
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setStartDate: (date) => dispatch(setStartDate(date)),
        setEndDate: (date) => dispatch(setEndDate(date)),
        getUsers: (callback) => dispatch(getUsers(callback)),
        getTimeEntries: (users, dates, callback) => dispatch(getTimeEntries(users, dates, callback)),
        getCalToken: (callback) => dispatch(getCalToken(callback)),
        getCalEntries: (users, dates, token, callback) => dispatch(getCalEntries(users, dates, token, callback)),
        determineMissingDates: (users, timesheet, cal, dates, callback) => dispatch(determineMissingDates(users, timesheet, cal, dates, callback))
    };
};

const mapStateToProps = (state) => { // map the app store state to the ExpenseList props
    return {  
        searchDates: state.searchDates,                       // reruns automatically as store changes
        users: selectUsers(state.users),
        timeEntries: state.timeEntries,
        cal: state.cal
        //users: selectUsers(state.users, state.filters)
    };
};

UsersList.defaultProps = {
    componentName: 'This app queries both Harvest and Google Calendar APIs and returns the names of timesheet users who have days that are unaccounted for during the specified time period, along with the specific dates that are missing (excluding vacation days and weekends). Set your date range then click RUN QUERY.'
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList); // connected component (not for testing so connect to store)

// Alternative Definition:

// export default connect((state) => { // ConnectedComponentList
//     return {
//         expenses: state.expenses
//     };
// })(ExpenseList); // connect ExpenseList to the app's redux store
// export default ConnectedExpenseList;