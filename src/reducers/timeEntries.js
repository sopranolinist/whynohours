/*************************************
 *  TIMEENTRIES REDUCER
 *  import timeReducer
 *************************************/ 

 /** 
  * Time Entry Structure
  */
//  timeEntry = {
//      userId: 'alphaNumString',
//      dates: ['yyyy-mm-dd', 'yyyy-mm-dd', etc]
//  }

const timeReducerDefaultState = [];

export default (state = timeReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_TIME_ENTRIES':
        return [
            ...action.payload
        ];
        case 'TIME_ENTRIES_ERROR':
            console.log('TIME_ENTRIES_ERROR: ', action.payload);
            return state;
        default:
            return state;
    }
};
