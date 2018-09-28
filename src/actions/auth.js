import axios from 'axios';
import config from '../config';

export const signin = (passcode, callback) => async (dispatch) => { // can return function now, thanks to redux-thunk
    // clear any previous errors
    dispatch({
        type: 'AUTH_ERROR',
        payload: ''
    });

    try {
        // post data to backend API:
        //const response = await axios.post('http://localhost:3090/signin', formProps); // formProps is { email: 'whatever@email.com', password: 'whatever123'}
        const response = await axios.post(`${config.SERVER_APP_URI}/signin`, { passcode: passcode });
        dispatch({
            type: 'AUTH_USER',
            payload: response.data.token
        });
        console.log(response.data);
        localStorage.setItem('wnhToken', response.data.token); // store token so it persists if page is refreshed
        callback(); // this.props.push.history('/feature');
    } catch (e) {
        console.log('error executing signin action');
        dispatch({
            type: 'AUTH_ERROR',
            payload: 'Invalid passcode. Please try again.'
        });
    }        
};

export const clearErrors = () => {
    return {
        type: 'AUTH_ERROR',
        payload: ''
    };
}