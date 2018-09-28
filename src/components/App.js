import React from 'react';
import { connect } from 'react-redux';
import UsersList from './UsersList';
import SignIn from './SignIn';
import '../styles/styles.css';

class App extends React.Component {

    render() {
        return (
            <div>
                <div className="header">
                    <div className="container">
                        <div className="header__title">{this.props.appTitle}</div>
                        <div className="warning">{this.props.appSubtitle}</div>
                    </div>                   
                </div> 
                {this.props.authenticated 
                    ? <UsersList />
                    : <SignIn />
                }               
            </div>
        );
    }  
}

App.defaultProps = {
    appTitle: 'Why No Hours?',
    appSubtitle: "Find out who's behind on their timesheet entries."
    // users: [
    //     {id: '1', firstname: 'Jen', lastname: 'Lindsay'},
    //     {id: '2', firstname: 'Jon', lastname: 'DeArmas'},
    //     {id: '3', firstname: 'Stephen', lastname: 'Grider'},
    //     {id: '4', firstname: 'Carmen', lastname: 'SanDiego'}
    // ]
};

const mapStateToProps = (state, props) => {
    return {
        authenticated: state.auth.authenticated
    };
};

export default connect(mapStateToProps)(App);