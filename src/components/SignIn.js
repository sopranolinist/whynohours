import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-loading-overlay';
import { signin } from '../actions/auth';

class SignIn extends React.Component {
    state = {
        passcode: '',
        showSpinner: false
    }

    onPasscodeChange = (e) => {
        const passcode = e.target.value;
        this.setState(() => ({ passcode }));
    };

    onClick = (e) => {
        this.state.showSpinner = true;
        this.props.signin(this.state.passcode, () => {
                this.state.showSpinner = false;
        });
    };

    render() {
        return (
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
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signin: (data, callback) => dispatch(signin(data, callback))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);