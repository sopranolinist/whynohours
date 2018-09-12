/*************************************
 *  USERS REDUCER
 *  import usersReducer
 *************************************/ 

 /** 
  * User Structure
  */
//  user = {
//      id: 'alphaNumString',
//      email: 'emailAddress',
//      firstname: 'firstName',
//      lastname: 'lastName',
//      missingDates: []
//  }

const usersReducerDefaultState = [];

export default (state = usersReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_USERS':
        return action.payload;
        case 'DETERMINE_MISSING_DATES':
            return action.payload;
        case 'USERS_ERROR':
            console.log('USERS_ERROR: ', action.payload);
            return state;
        default:
            return state;
    }
};

