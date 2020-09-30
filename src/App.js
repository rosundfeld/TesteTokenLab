//Importing React
import React, { useEffect, useState } from 'react';

//Components
import Header from './Template/header';
import Footer from './Template/footer';
import Nav from './Template/nav';
import LoginComponent from './views/login';

//Importing global Css
import './assets/styles/global.css';

//materialUi loader
import { CircularProgress } from '@material-ui/core';

//Importing firebase 
import firebase from './firebase'

function App() {

  //variable to check if firebase is initialized
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  const [isLogged, setIsLogged] = useState(false);

  //check if firebase is initilized before enter the website
  useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseInitialized(val);
    })
  })

  if( firebase.getCurrentUsername() ) {
    setIsLogged(true);
  }


  return firebaseInitialized !== false ? (
    <div className="App">
      { isLogged ? 
        <div className="App">
          <Header></Header>
          <Nav></Nav>
          <Footer></Footer>
        </div>
        :
        <div className="App">
          <LoginComponent />
        </div>
      }
        
       
    </div>
  ) : <div id="loader" > <CircularProgress /> </div>;
}

export default App;
