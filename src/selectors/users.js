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

export default (users) => {   
    return users.sort((a,b) => {
        return a.lastname > b.lastname ? 1 : -1; // sort AtoZ
    });
};
