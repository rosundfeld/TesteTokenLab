import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore'
import { environment } from './environments/environment'

//Firebase Configuration
const config = {
    apiKey: "AIzaSyBEUdGVysxRhoPjEuFWfzShj-iJ0QoSQW0",
    authDomain: "tokens-db1b6.firebaseapp.com",
    databaseURL: "https://tokens-db1b6.firebaseio.com",
    projectId: "tokens-db1b6",
    storageBucket: "tokens-db1b6.appspot.com",
    messagingSenderId: "215846096177",
    appId: "1:215846096177:web:ffee792ffa7c659575b410",
    measurementId: "G-KZ8R2K02FQ"
  };

  class Firebase {
      constructor() {
            // Initialize Firebase, firestore and firebase auth
            app.initializeApp(config);
            this.auth = app.auth();
            this.db = app.firestore();
      }

      //login function
      login(email, password) {
          return this.auth.signInWithEmailAndPassword(email, password);
      }

      //logout function
      logout() {
          return this.auth.signOut();
      }

      //register function
      async register(name, email, password) {
       await this.auth.createUserWithEmailAndPassword(email, password);
       return this.auth.currentUser.updateProfile({
           displayName: name
       })
    }  

    //function to check if firebase is initialized
    isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

    //Function to get the logged username
    getCurrentUsername() {
        return this.auth.currentUser && this.auth.currentUser.displayName
    }

    //function to get the logged user id
    getCurrentUserId() {
        return this.auth.currentUser && this.auth.currentUser.uid
    }


    verifyLogin() {
        if ( this.auth.currentUser ){
            return true
        } else {
            return false
        }
    }


    //Save new event
    async saveEvent(eventTitle, eventDescription, eventDateBegin, eventDateEnd ){
        try {
            console.log('calling create item endpoint with: ' + eventTitle);

            let splitedStringBegin = eventDateBegin.split("T");
            let splitedStringEnd = eventDateEnd.split("T");
    
            let newStringBegin = splitedStringBegin[0].split("-");
            let newStringEnd = splitedStringEnd[0].split("-");
            
            let dateBegin = newStringBegin[2] + "/" + newStringBegin[1] + "/" + newStringBegin[0];
            let timeBegin = splitedStringBegin[1];
    
            let dateEnd = newStringEnd[2] + "/" + newStringEnd[1] + "/" + newStringEnd[0];
            let timeEnd = splitedStringEnd[1];

            let beginTimestamp = Math.round(new Date(eventDateBegin).getTime()/1000)
            let endTimestamp = Math.round(new Date(eventDateEnd).getTime()/1000)

            const requestBody = {
              userId: this.getCurrentUserId(),
              title: eventTitle,
              description: eventDescription,
              beginDate: dateBegin,
              beginTime: timeBegin,
              endDate: dateEnd,
              endTime: timeEnd,
              beginTimestamp: beginTimestamp,
              endTimestamp: endTimestamp
            };
      
            const createResponse =
              await fetch(environment.create, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers:{
                  'Content-Type': 'application/json'
                }
              });
              console.log('Success');
              console.log(createResponse.status);
      
              this.getEventData();
          } catch (error) {
            console.log(error);
          }
    }

     //get all events from logged user 
     async getEventData() {
        try {
            const userId = this.getCurrentUserId();

            console.log(environment.readAll + userId);
            console.log('calling read all endpoint');

            const output = await fetch(environment.readAll + userId, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            const outputJSON = await output.json();
            console.log('Success');
            return(outputJSON);
          } catch (error) {
            console.log(error);
        }
    }

    async updateItem(id, eventTitleEdit, eventDescriptionEdit, datetimeBeginEdit, datetimeEndEdit) {
        try {
          const userId = this.getCurrentUserId();

          console.log(environment.update + id);
          console.log('calling update endpoint with id ' + id + ' and value "' + eventTitleEdit);

          let splitedStringBegin = datetimeBeginEdit.split("T");
          let splitedStringEnd = datetimeEndEdit.split("T");
  
          let newStringBegin = splitedStringBegin[0].split("-");
          let newStringEnd = splitedStringEnd[0].split("-");
          
          let dateBegin = newStringBegin[2] + "/" + newStringBegin[1] + "/" + newStringBegin[0];
          let timeBegin = splitedStringBegin[1];
  
          let dateEnd = newStringEnd[2] + "/" + newStringEnd[1] + "/" + newStringEnd[0];
          let timeEnd = splitedStringEnd[1];

          let beginTimestamp = Math.round(new Date(datetimeBeginEdit).getTime()/1000)
          let endTimestamp = Math.round(new Date(datetimeEndEdit).getTime()/1000)
    
          const requestBody = {
            userId: this.getCurrentUserId(),
              title: eventTitleEdit,
              description: eventDescriptionEdit,
              beginDate: dateBegin,
              beginTime: timeBegin,
              endDate: dateEnd,
              endTime: timeEnd,
              beginTimestamp: beginTimestamp,
              endTimestamp: endTimestamp
          };
    
          const updateResponse =
            await fetch(environment.update + userId + "/" + id, {
              method: 'PUT',
              body: JSON.stringify(requestBody),
              headers:{
                'Content-Type': 'application/json'
              }
            });
          console.log('Success');
          console.log(updateResponse.status);
    
          // call select all to update the table
          this.selectAll();
        } catch (error) {
          console.log(error);
        }
      }

    
    async deleteItem(id) {
        try {
          const userId = this.getCurrentUserId();

          console.log(environment.delete);
          console.log('calling delete endpoint with id ' + userId + '/' + id);
    
          const deleteResponse =
            await fetch(environment.delete + userId + '/' + id, {
              method: 'DELETE',
              headers:{
                'Content-Type': 'application/json'
              }
            });
    
          console.log('Success');
          console.log(deleteResponse.status);
        } catch (error) {
          console.log(error);
        }
      }
}

export default new Firebase();