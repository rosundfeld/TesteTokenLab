import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore'

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

    verifyLogin() {
        if ( this.auth.currentUser ){
            return true
        } else {
            return false
        }
    }
}

export default new Firebase();