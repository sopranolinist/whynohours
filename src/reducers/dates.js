import moment from 'moment';

const datesReducerDefaultState = {
    startDate: moment().subtract(2, 'weeks'),
    endDate: moment()
};

export default (state = datesReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.payload
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.payload
            };
        case 'DATES_ERROR':
            console.log('DATES_ERROR: ', action.payload);
            return state;
        default:
            return state;
    }
};

