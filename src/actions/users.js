/**
 * Users Action Creators/Generators
 */

import axios from 'axios';
import moment from 'moment';
import config from '../../config';

// User Structure
//  user = {
//      id: 'alphaNumString',
//      email: 'emailAddress',
//      firstname: 'firstName',
//      lastname: 'lastName'
//  }

const HARVEST_SERVER_URI = 'https://api.harvestapp.com/v2';
const HARVEST_USER_AGENT = 'Harvest API Example';

export const determineMissingDates = (users, timeEntries, cal, dates, callback) => (dispatch) => {
    const initialDate = moment(dates.startDate);
    const searchRange = dates.endDate.diff(dates.startDate, 'days');
    for(var i = 0; i<=searchRange; i++) {
        let searchDateObject = initialDate;
        let searchDate = searchDateObject.format('YYYY-MM-DD');
        if (searchDateObject.format('d') !== '0' && searchDateObject.format('d') !== '6') { // don't care about weekends
            users.forEach((user) => {
                let entryFound, entryDateFound, eventFound, eventDateFound;
                // look at timesheet first
                entryFound = timeEntries.find((entry) => entry.email === user.email);
                if (entryFound) {
                    entryDateFound = entryFound.dates.find((date) => date === searchDate);
                }
                // only search calendar events if no timesheet entry on search date
                if (!entryDateFound) {
                    eventFound = cal.find((event) => event.email === user.email);
                    // if leave on calendar, see if search date is in that time period
                    if (eventFound) {
                        eventDateFound = moment(searchDate).isBetween(eventFound.startDate,eventFound.endDate, null, '[]');
                        if (!eventDateFound) { // search date not within leave time period --> WhyNoHours??
                            user.missingDates.push(searchDate);
                        }
                    } else { // no timesheet entry and no leave on calendar --> WhyNoHours???
                        user.missingDates.push(searchDate);
                    }
                }
            });
        }
        initialDate.add(1, 'days'); // add is mutating
    }
    dispatch({
        type: 'DETERMINE_MISSING_DATES',
        payload: users
    });
    callback();
};

export const getUsers = (callback) => async (dispatch) => {
    console.log('Retrieving users...');
    try {
        // Get All Users
        const response = await axios.get(
            `${HARVEST_SERVER_URI}/users`, 
            {
                headers: {
                    'Authorization': `Bearer ${config.HARVEST_ACCESS_TOKEN}`,
                    'Harvest-Account-ID': `${config.HARVEST_ACCOUNT_ID}`,
                    'User-Agent': `${HARVEST_USER_AGENT}`
                }
            }
        );
        const users = response.data.users.map((user) => ({
            id: user.id,
            email: user.email,
            firstname: user.first_name,
            lastname: user.last_name,
            missingDates: []
        }));           
        dispatch({
            type: 'GET_USERS',
            payload: users
        });
        console.log('Users retrieved!');
        callback(users);
    } catch (e) {
        dispatch({
            type: 'USERS_ERROR',
            payload: e
        });
    }
};

