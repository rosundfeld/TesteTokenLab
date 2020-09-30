import React, { useEffect, useState } from 'react';

//importing firease
import firebase from '../../firebase'

//Material Ui
import { FormControl, Input, InputLabel, Paper, Button, CircularProgress, Snackbar } from '@material-ui/core';

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

    //wallpaper random
    const [wallpaperNumber, setWallpaperNumber] = useState(null);

    //confirm Register to trigger snackbar
    let [confirmRegister, setConfirmRegister] = useState(false);

    //login Function
    async function login() {
        try {
            await firebase.login(loginEmail, loginPwd);
            window.location.reload(false);
        }catch(error){
            console.log(error.message)
        }
    }

    //pick a random wallpaper
    useEffect(() => {
        setWallpaperNumber(Math.ceil(Math.random() * 5));
    }, [wallpaperNumber])

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
            <div className="loginPage">
                <div className="loginContainer">
                        <Paper className="loginForm" elevation={6}>
                                <div className="logoContainer">
                                    <img src={require('../../assets/images/logoNoText.jpg')} alt="logo TokenLabs"/>
                                </div>
                            <div className="formActions">
                                    <FormControl>
                                        <InputLabel htmlFor="email">Email</InputLabel>
                                        <Input required value={loginEmail} onChange={ e => setLoginEmail(e.target.value)} autoComplete="off" id="email" aria-describedby="digite seu E-mail" />
                                    </FormControl>
                                    <FormControl>
                                        <InputLabel htmlFor="password">Senha</InputLabel>
                                        <Input required value={loginPwd} onChange={ e => setLoginPwd(e.target.value)} autoComplete="off" type="password" id="password" aria-describedby="digite sua senha" />
                                    </FormControl>
                                    <div className="buttonsContainerLogin">
                                        <Button type="submit" onClick={() => login()} className="defaultButton" >
                                            Logar
                                        </Button>
                                        <Button onClick={() => handleOpenRegister()} id="registerButton" >
                                            Registrar
                                        </Button>
                                    </div>
                            </div>
                                <span className="forgot"> Esqueci minha senha </span>
                                {firebase.getCurrentUsername()}
                        </Paper>
                </div>
                { wallpaperNumber !== null ?
                    <div className="wallpaperContainer">
                        <img className="wallpaperImg" src={require('../../assets/images/wallpapers/wallpaper' + wallpaperNumber + '.jpg')} alt="Plano de fundo do login" ></img>
                    </div> 
                    :
                    <div id="loader">
                        <CircularProgress />
                    </div>
                }
            </div>

            {confirmRegister && 
                  <Snackbar
                  className="snackBarSuccess"
                  anchorOrigin={ { vertical: 'bottom', horizontal: 'center' } }
                  open={confirmRegister}
                  onClose={() => setConfirmRegister(false)}
                  message="Usuário registrado!"
                  autoHideDuration={3000}
                >
                    <Paper elevation={5} className="successAlert">
                        Usuário Registrado!
                    </Paper>
                </Snackbar>
            }

           { openRegister && 
                <RegisterComponent setConfirmRegister={setConfirmRegister} openRegister={openRegister} handleCloseRegister={() => handleCloseRegister()} />
           }

        </div>
    )
}

export default LoginComponent;