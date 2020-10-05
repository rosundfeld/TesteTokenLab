import React, { useState, useEffect } from 'react';

//Material Ui
import { FormControl, Input, InputLabel, Paper, Button } from '@material-ui/core';

//Dialog imports
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

//Material UI input complements
import { InputAdornment, IconButton } from '@material-ui/core';

//Material Ui Icons
import { Visibility, VisibilityOff } from '@material-ui/icons';

//importing firebase
import firebase from '../../firebase';

//Css
import './styles.css';

function RegisterComponent({openRegister, handleCloseRegister, setConfirmRegister}) {

    //Register variables
    let [ registerEmail, setRegisterEmail ] = useState("");
    let [ registerUsername, setRegisterUsername ] = useState("");
    let [ registerPwd, setRegisterPwd ] = useState("");
    let [ confirmPwd, setConfirmPwd ] = useState("");

    //show password variable
    let [showPassword, setShowPassword ] = useState(false);
    let [showPasswordConfirm, setShowPasswordConfirm ] = useState(false);

     //show password variable
     let [showErrorMessage, setShowErrorMessage ] = useState(false);

    //toggle function to show password
    function handleShowPassword() {
        setShowPassword(showPassword => !showPassword);
    }

    function handleShowPasswordConfirm() {
        setShowPasswordConfirm(showPasswordConfirm => !showPasswordConfirm);
    }

    
    useEffect(() => {
        function checkPwdMatch() {
            return registerPwd === confirmPwd ? setShowErrorMessage(true) : setShowErrorMessage(false)
        };
        //check password match
        checkPwdMatch();
      }, [registerPwd, confirmPwd]);

    //Register function
    async function registerUser() {
        if(showErrorMessage){
            try {
                await firebase.register(registerUsername, registerEmail, registerPwd);
                setConfirmRegister(true);
                handleCloseRegister();
            } catch(error) {
                console.log(error)
            }
        }
    }

    return (
        <div id="register">
            <Dialog
                className="dialogAnimation"
                open={openRegister}
                maxWidth={'lg'}
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
                        <div className="emailUserContainer">
                            <FormControl>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input required value={registerEmail} onChange={ e => setRegisterEmail(e.target.value)} autoComplete="off"  id="email" aria-describedby="digite seu E-mail" />
                            </FormControl>

                            <FormControl>
                                <InputLabel htmlFor="username">Nome de Usuário</InputLabel>
                                <Input required value={registerUsername} onChange={ e => setRegisterUsername(e.target.value)} autoComplete="off" type="text" id="username" aria-describedby="digite seu nome de usuário" />
                            </FormControl>
                        </div>

                        {/* Divider */}
                        <hr className="dividerSolid" />

                        <FormControl>
                            <InputLabel htmlFor="userPwd">Senha</InputLabel>
                            <Input 
                                required 
                                value={registerPwd} 
                                onChange={ e => setRegisterPwd(e.target.value)} 
                                autoComplete="off" 
                                type={showPassword ? 'text' : 'password'}
                                id="userPwd" 
                                aria-describedby="digite sua senha" 
                                endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="Aperte para mostrar a senha"
                                        onClick={ () => handleShowPassword()}
                                      >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                      </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        <FormControl>
                            <InputLabel htmlFor="pwdConfim">Repetir senha</InputLabel>
                            <Input 
                            required 
                            value={confirmPwd} 
                            onChange={ e => setConfirmPwd(e.target.value)} 
                            autoComplete="off" 
                            type={showPasswordConfirm ? 'text' : 'password'}
                            id="pwdConfim" 
                            aria-describedby="confirme sua senha" 
                            endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="Aperte para mostrar a senha"
                                    onClick={ () => handleShowPasswordConfirm()}
                                  >
                                    {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
                            }
                        />
                        </FormControl>
                        { ! showErrorMessage ? 
                           <span className="errorMessage">Confirmação de senha diferente</span>
                           : null
                        }

                    </DialogContent>
                    
                    <DialogActions className="buttonsContainerRegister">
                        <Button type="submit" onClick={() => registerUser()} className="defaultButton">
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