/*************************************
 *  USERS SUMMARY
 *  import UsersSummary
 *  used in: UsersList
 *************************************/ 

import React from 'react';
import { connect } from 'react-redux';
import { selectUsersWithMissingDates } from '../selectors/users';
import '../styles/styles.css';

class UsersSummary extends React.Component {
    render() {
        return (
            <div>
                {
                    this.props.userCount > 0 &&
                    <div className="widget-header">{this.props.userCount} {this.props.userCount > 1 ? 'users have' : 'user has'} missing timesheet entries (expand to view dates):</div>
                }            
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const selectedUsersWithMissingDates = selectUsersWithMissingDates(state.users);
    return {
        userCount: selectedUsersWithMissingDates.length
    }
};

export default connect(mapStateToProps)(UsersSummary);