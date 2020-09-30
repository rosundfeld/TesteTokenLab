import React, { useState } from 'react';

//importing firease
import firebase from '../../firebase'

//Material Ui
import { FormControl, Input, InputLabel, Paper, Button } from '@material-ui/core';

//Material Ui Icons
import {  } from '@material-ui/icons';

//Css
import './styles.css';

//Components
import RegisterComponent from '../../components/register';

function LoginComponent( props ) {

    //Toggle register variables
    let [ openRegister, setOpenRegister ] = useState(false);

    //Login variables
    let [ loginEmail, setLoginEmail ] = useState("");
    let [ loginPwd, setLoginPwd ] = useState("");

    //login Function
    async function login() {
        try {
            await firebase.login(loginEmail, loginPwd);
            window.location.reload(false);
        }catch(error){
            console.log(error.message)
        }
    }

    //Toggle open register function
    function handleOpenRegister() {
        setOpenRegister(true);
    }

    //Toggle close register function
    function handleCloseRegister() {
        setOpenRegister(false);
    }

    return (
        <div id="login">
           <div className="loginContainer">
                <Paper className="loginForm" elevation={3}>
                        <div className="logoContainer">
                            <img src={require('../../assets/images/logoNoText.jpg')} alt="logo TokenLabs"/>
                        </div>
                    <div className="formActions">
                            <FormControl>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input value={loginEmail} onChange={ e => setLoginEmail(e.target.value)} autoComplete="off" id="email" aria-describedby="digite seu E-mail" />
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="password">Senha</InputLabel>
                                <Input value={loginPwd} onChange={ e => setLoginPwd(e.target.value)} autoComplete="off" type="password" id="password" aria-describedby="digite sua senha" />
                            </FormControl>
                            <div className="buttonsContainerLogin">
                                <Button onClick={() => login()} className="defaultButton" >
                                    Logar
                                </Button>
                                <Button onClick={() => handleOpenRegister()} id="registerButton" >
                                    Registrar
                                </Button>
                            </div>
                    </div>
                        <span className="forgot"> Esqueci minha senha </span>
                </Paper>
           </div>

           { openRegister && 
                <RegisterComponent openRegister={openRegister} handleCloseRegister={() => handleCloseRegister()} />
           }

        </div>
    )
}

export default LoginComponent;