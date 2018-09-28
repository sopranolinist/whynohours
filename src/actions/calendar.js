/**
 * Calendar Action Creators/Generators
 */
import axios from 'axios';
import config from '../config';

export const getCalToken = (callback) => async (dispatch) => {

    try {
        const authToken = localStorage.getItem('wnhToken');
        const response = await axios.get(
            `${config.SERVER_APP_URI}/calToken`, 
            {
                headers: {
                    'Authorization': authToken
                }
            }
        );
        if (response.status !== 200) {
            throw new Error(`Error ${response.status} ${response.statusText}`);
        }
        const accessToken = response.data;
        dispatch({
            type: 'GET_CAL_TOKEN',
        });
        callback(accessToken);
    } catch (e) {
        dispatch({
            type: 'CAL_ERROR',
            payload: e
        });
    }   
};

export const getCalEntries = (users, dates, accessToken, callback) => async (dispatch) => {
    const end = dates.endDate.toISOString(true).substring(0,23).concat('Z'); // avoid toISOString() converstion to UTC
    const endEncoded = encodeURIComponent(end);
    const start = dates.startDate.toISOString(true).substring(0,23).concat('Z'); // avoid toISOString() converstion to UTC
    const startEncoded = encodeURIComponent(start);

    try {
        // Get All Cal Entries
        const authToken = localStorage.getItem('wnhToken');
        const response = await axios.get(
            `${config.SERVER_APP_URI}/calEntries?startDate=${startEncoded}&endDate=${endEncoded}&accessToken=${accessToken}`, 
            {
                headers: {
                    'Authorization': authToken
                }
            }
        );
        if (response.status !== 200) {
            throw new Error(`Error ${response.status} ${response.statusText}`);
        }
        // parse response for only the data we need from the response
        const userEmails = users.map((user) => user.email);
        const parsedResponse = response.data.filter(function(event) {
                return !!event.start && !!event.end;
        }).map((event) => ({
                emails: event.attendees.map((attendee) => attendee.email),
                startDate: event.start.date,
                endDate: event.end.date
        })).filter((event) => 
            event.emails.some((email) => 
                userEmails.includes(email)));

        // further parsing to achieve one email per entry
        let responseData = [];
        parsedResponse.forEach((entry) => {
            entry.emails.forEach((email) => {
                responseData.push({
                    email: email,
                    startDate: entry.startDate,
                    endDate: entry.endDate
                });
            });
        });
        dispatch({
            type: 'GET_CAL_ENTRIES',
            payload: responseData
        });
        callback(responseData);
    } catch (e) {
        dispatch({
            type: 'CAL_ERROR',
            payload: e
        });
    }
};

/** OLD VERSION BEFORE SERVER SIDE APP */
// function generateToken() {
//     const now = moment();
//     const exp = now.add(60, 'seconds').unix();
//     const iat = now.unix();
//     return jwt.encode({
//         iss: config.GC_SERVICE_ACCOUNT_CLIENT_EMAIL,
//         scope: GC_SCOPE,
//         aud: GC_AUD,
//         exp: exp,
//         iat: iat
//     }, 
//     config.GC_SERVICE_ACCOUNT_PRIVATE_KEY,
//     'RS256'
//     );
// }

// export const getCalToken = (callback) => async (dispatch) => {
//     const jwtToken = generateToken();

//     try {
//         const response = await axios.post(GC_AUD, { grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwtToken });
//         const accessToken = response.data.access_token;
//         dispatch({
//             type: 'GET_CAL_TOKEN',
//         });
//         callback(accessToken);
//     } catch (e) {
//         dispatch({
//             type: 'CAL_ERROR',
//             payload: e
//         });
//     }   
// };

// export const getCalEntries = (users, dates, accessToken, callback) => async (dispatch) => {
//     const end = dates.endDate.toISOString(true).substring(0,23).concat('Z'); // avoid toISOString() converstion to UTC
//     const endEncoded = encodeURIComponent(end);
//     const start = dates.startDate.toISOString(true).substring(0,23).concat('Z'); // avoid toISOString() converstion to UTC
//     const startEncoded = encodeURIComponent(start);

//     try {
//         // Get All Users
//         const response = await axios.get(
//             `${config.GC_URI}/events?timeMax=${endEncoded}&timeMin=${startEncoded}&fields=items(attendees(displayName%2Cemail)%2Cend%2Fdate%2Cstart%2Fdate)&access_token={${accessToken}}`,
//             { headers: {
//                     'Authorization': `Bearer ${accessToken}`
//                 }
//             }
//         );
//         // parse response for only the data we need from the response
//         const userEmails = users.map((user) => user.email);
//         const parsedResponse = response.data.items.filter(function(event) {
//                 return !!event.start && !!event.end;
//         }).map((event) => ({
//                 emails: event.attendees.map((attendee) => attendee.email),
//                 startDate: event.start.date,
//                 endDate: event.end.date
//         })).filter((event) => 
//             event.emails.some((email) => 
//                 userEmails.includes(email)));

//         // further parsing to achieve one email per entry
//         let responseData = [];
//         parsedResponse.forEach((entry) => {
//             entry.emails.forEach((email) => {
//                 responseData.push({
//                     email: email,
//                     startDate: entry.startDate,
//                     endDate: entry.endDate
//                 });
//             });
//         });
//         dispatch({
//             type: 'GET_CAL_ENTRIES',
//             payload: responseData
//         });
//         callback(responseData);
//     } catch (e) {
//         dispatch({
//             type: 'CAL_ERROR',
//             payload: e
//         });
//     }
// };
  