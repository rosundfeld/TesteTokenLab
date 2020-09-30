import React, { useState } from 'react';

//Material Ui
import { FormControl, Input, InputLabel, Paper, Button } from '@material-ui/core';

//Dialog imports
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

//Material Ui Icons
import {  } from '@material-ui/icons';

//importing firebase
import firebase from '../../firebase';

//Css
import './styles.css';

function RegisterComponent({openRegister, handleCloseRegister, props}) {

    //Register variables
    let [ registerEmail, setRegisterEmail ] = useState("");
    let [ registerUsername, setRegisterUsername ] = useState("");
    let [ registerPwd, setRegisterPwd ] = useState("");
    let [ confirmPwd, setConfirmPwd ] = useState("");

    //Register function
    async function registerUser() {
        try {
            await firebase.register(registerUsername, registerEmail, registerPwd)
            handleCloseRegister();
        } catch(error) {
            console.log(error.message)
        }
    }

    return (
        <div id="register">
            <Dialog
                className="dialogAnimation"
                open={openRegister}
                keepMounted
                onClose={() => handleCloseRegister()}
                aria-labelledby="Registrar usuário"
                aria-describedby="Tela para registrar usuário"
            >
                <Paper className="registerContainer" elevation={3}>

                    <DialogTitle>
                        <span className="registerTitle">Registrar Usuário</span>
                    </DialogTitle>

                    <DialogContent className="formContent">

                        <FormControl>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input value={registerEmail} onChange={ e => setRegisterEmail(e.target.value)} autoComplete="off"  id="email" aria-describedby="digite seu E-mail" />
                        </FormControl>

                        <FormControl>
                            <InputLabel htmlFor="username">Nome de Usuário</InputLabel>
                            <Input value={registerUsername} onChange={ e => setRegisterUsername(e.target.value)} autoComplete="off" type="text" id="username" aria-describedby="digite seu nome de usuário" />
                        </FormControl>

                        {/* Divider */}
                        <hr class="dividerSolid" />

                        <FormControl>
                            <InputLabel htmlFor="userPwd">Senha</InputLabel>
                            <Input value={registerPwd} onChange={ e => setRegisterPwd(e.target.value)} autoComplete="off" type="password" id="userPwd" aria-describedby="digite sua senha" />
                        </FormControl>

                        <FormControl>
                            <InputLabel htmlFor="pwdConfim">Repetir senha</InputLabel>
                            <Input value={confirmPwd} onChange={ e => setConfirmPwd(e.target.value)} autoComplete="off" type="password" id="pwdConfim" aria-describedby="confirme sua senha" />
                        </FormControl>

                    </DialogContent>
                    
                    <DialogActions className="buttonsContainerRegister">
                        <Button onClick={() => registerUser()} className="defaultButton">
                            Registrar
                        </Button>
                        <Button onClick={() => handleCloseRegister()} className="cancelButton">
                            Cancelar
                        </Button>
                    </DialogActions>
                </Paper>
            </Dialog>
        </div>
    )
}

export default RegisterComponent;