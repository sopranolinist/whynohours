/*************************************
 *  USERS SUMMARY
 *  import UsersSummary
 *  used in: UsersList
 *************************************/ 

import React from 'react';
import { connect } from 'react-redux';
import selectUsers from '../selectors/users';
import '../styles/styles.css';

class UsersSummary extends React.Component {
    render() {
        return (
            <div>
                {
                    this.props.userCount > 0 &&
                    <div className="widget-header">{this.props.userCount} {this.props.userCount > 1 ? 'users have' : 'user has'} not entered any hours on the following date(s):</div>
                }            
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const selectedUsers = selectUsers(state.users);
    return {
        userCount: selectedUsers.length
    }
};

export default connect(mapStateToProps)(UsersSummary);