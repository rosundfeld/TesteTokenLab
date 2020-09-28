import React from 'react';
import Header from './Template/header';
import Footer from './Template/footer';
import Nav from './Template/nav';

import './assets/styles/global.css';

function App() {
  return (
    <div className="App">
        <Header></Header>
        <Nav></Nav>
        <Footer></Footer>
    </div>
  );
}

export default App;
