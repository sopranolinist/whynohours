/**
 * Time Entries Action Creators/Generators
 */

import axios from 'axios';
import moment from 'moment';
import config from '../../config';

const HARVEST_SERVER_URI = 'https://api.harvestapp.com/v2';
const CORS_PROXY_URI = 'https://cors-anywhere.herokuapp.com/';
//const HARVEST_ACCESS_TOKEN = '1693057.pt.O0h_-Hkf00jqrt0jtpLUIpJk8UF8SpXfOvcBu1i62yLahYcLQXMdAdNbPZ1hueEdQjMmEEMnWVMV2-2nt7_9Zw';
//const HARVEST_ACCOUNT_ID = '978212';
const HARVEST_USER_AGENT = 'Harvest API Example';

// NEED TO FINISH TIME ENTRIES ACTION AND CREATE TIME ENTRIES REDUCER AND ADD TO CONFIGURE STORE!

export const getTimeEntries = (users, dates, callback) => async (dispatch) => {
    try {
        const timeEntries = [];
        for (const user of users) {
            const response = await axios.get(
                `${CORS_PROXY_URI}${HARVEST_SERVER_URI}/time_entries?user_id=${user.id}&from=${dates.startDate.format('YYYY-MM-DD')}&to=${dates.endDate.format('YYYY-MM-DD')}`, 
                {
                    headers: {
                        'Authorization': `Bearer ${config.HARVEST_ACCESS_TOKEN}`,
                        'Harvest-Account-ID': `${config.HARVEST_ACCOUNT_ID}`,
                        'User-Agent': `${HARVEST_USER_AGENT}`,
                        'Origin': 'null'
                    }
                }
            );

            // only push entries with data -> map only the date, don't need the rest
            if (response.data.time_entries.length > 0) { 
                const filteredEntries = response.data.time_entries.map((entry) => (entry.spent_date));
                const timeEntriesForUser = {
                    id: user.id,
                    email: user.email,
                    dates: filteredEntries
                };
                timeEntries.push(timeEntriesForUser); 
            };            
        } 
        dispatch({
            type: 'GET_TIME_ENTRIES',
            payload: timeEntries
        });
        callback(timeEntries);
    } catch (e) {
        dispatch({
            type: 'TIME_ENTRIES_ERROR',
            payload: e
        });
    }
};