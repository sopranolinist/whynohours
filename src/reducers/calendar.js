/** 
  * Calendar Structure
  */

//  calEntry = {
//      emails: ['email1@whatever.com', etc],
//      endDate: 'yyyy-mm-dd',
//      startDate: 'yyyy-mm-dd'
//  }

const calReducerDefaultState = [];

export default (state = calReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_CAL_ENTRIES':
        return [ 
            ...action.payload
        ];
        case 'CAL_ERROR':
            console.log('CAL_ERROR: ', action.payload);
            return state;
        default:
            return state;
    }
};