/**
 * Time Entries Action Creators/Generators
 */

import axios from 'axios';
import config from '../config';

export const getTimeEntries = (users, dates, callback) => async (dispatch) => {
    try {
        const timeEntries = [];
        const authToken = localStorage.getItem('wnhToken');
        for (const user of users) {
            const response = await axios.get(
                `${config.SERVER_APP_URI}/timeEntries?userId=${user.id}&startDate=${dates.startDate.format('YYYY-MM-DD')}&endDate=${dates.endDate.format('YYYY-MM-DD')}`, 
                {
                    headers: {
                        'Authorization': authToken
                    }
                }
            );
            if (response.status !== 200) {
                throw new Error(`Error ${response.status} ${response.statusText}`);
            }
            // only push entries with data -> map only the date, don't need the rest
            if (response.data.length > 0) { 
                const filteredEntries = response.data.map((entry) => (entry.spent_date));
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
            type: 'AUTH_ERROR',
            payload: e.message
        });
        callback(null);
    }
};

/** OLD VERSION BEFORE SERVER SIDE APP */
// export const getTimeEntries = (users, dates, callback) => async (dispatch) => {
//     try {
//         const timeEntries = [];
//         for (const user of users) {
//             const response = await axios.get(
//                 `${CORS_PROXY_URI}${HARVEST_SERVER_URI}/time_entries?user_id=${user.id}&from=${dates.startDate.format('YYYY-MM-DD')}&to=${dates.endDate.format('YYYY-MM-DD')}`, 
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${config.HARVEST_ACCESS_TOKEN}`,
//                         'Harvest-Account-ID': `${config.HARVEST_ACCOUNT_ID}`,
//                         'User-Agent': `${HARVEST_USER_AGENT}`,
//                         'Origin': 'null'
//                     }
//                 }
//             );

//             // only push entries with data -> map only the date, don't need the rest
//             if (response.data.time_entries.length > 0) { 
//                 const filteredEntries = response.data.time_entries.map((entry) => (entry.spent_date));
//                 const timeEntriesForUser = {
//                     id: user.id,
//                     email: user.email,
//                     dates: filteredEntries
//                 };
//                 timeEntries.push(timeEntriesForUser); 
//             };            
//         } 
//         dispatch({
//             type: 'GET_TIME_ENTRIES',
//             payload: timeEntries
//         });
//         callback(timeEntries);
//     } catch (e) {
//         dispatch({
//             type: 'TIME_ENTRIES_ERROR',
//             payload: e
//         });
//     }
// };