/*************************************
 *  USERS SELECTOR
 *  import selectUsers
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

export const selectUsers = (users) => {   
    return users.sort((a,b) => {
        return a.lastname > b.lastname ? 1 : -1; // sort AtoZ
    });
};

export const selectUsersWithMissingDates = (users) => {
    return users.filter((user) => user.missingDates.length > 0);
};
