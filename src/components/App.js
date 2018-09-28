import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-loading-overlay';
import UsersList from './UsersList';
import { signin } from '../actions/auth';
import '../styles/styles.css';

class App extends React.Component {
    state = {
        passcode: '',
        showSpinner: false
    };

    onPasscodeChange = (e) => {
        const passcode = e.target.value;
        this.setState(() => ({ passcode }));
    };

    onClick = (e) => {
        this.setState({ showSpinner: true });
        this.props.signin(this.state.passcode, () => {
            this.setState({ showSpinner: false });
        });
    };

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
                    ?   <UsersList />
                    :   <Spinner active={!(!this.state.showSpinner || (this.state.showSpinner && this.props.errorMessage))} spinner text='Signing you in...'>
                            <div className="container__centered--column">
                                <label className="widget__message container__centered--grow">Enter passcode for access:</label>
                                <input className="container__centered--grow"
                                    type="password"
                                    autoFocus
                                    value={this.state.passcode}
                                    onChange={this.onPasscodeChange}
                                />
                                {this.props.errorMessage && <div className="error">{this.props.errorMessage}</div>}
                                <button className="button container__centered--grow" onClick={this.onClick}>Enter</button>
                            </div>
                        </Spinner>
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
        authenticated: state.auth.authenticated,
        errorMessage: state.auth.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signin: (data, callback) => dispatch(signin(data, callback))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);