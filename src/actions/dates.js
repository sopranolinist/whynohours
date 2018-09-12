/**
 * Search Dates Action Creators/Generators
 */

export const setStartDate = (startDate) => {
    return {
        type: 'SET_START_DATE',
        payload: startDate
    };
};
export const setEndDate = (endDate) => {
    return {
        type: 'SET_END_DATE',
        payload: endDate
    };
};