import React, { useState } from 'react';

import { Avatar, Button, Paper, Grid, Typography, Container, Routes, TextField } from '@material-ui/core';

import './auth.css';

import Input from './Input';

import * as api from '../../api/index.js';

const initialState = { login: '', email: '', password: '', confirmPassword: '' };

const Auth = ({setLoginButtonName, loginButtonName, showAuth, setShowAuth}) => {

const [form, setForm] = useState(initialState);
const [isSignup, setIsSignup] = useState(false);

const [showPassword, setShowPassword] = useState(false);
const handleShowPassword = () => setShowPassword(!showPassword);

const handleSubmit = (e) => {

    e.preventDefault();

    if (isSignup) {
    console.log("h");
      fetch('http://172.17.0.1:8080/user/signup', {
        method: 'POST',
        mode: 'cors',
        headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
        body: JSON.stringify(form)
      }).then(function (response) {if (response.status===201){setForm(initialState);}});

    document.getElementsByName("login")[0].value="";
    document.getElementsByName("confirmPassword")[0].value="";

    } else {
      fetch('http://172.17.0.1:8080/user/signin', {
        method: 'POST',
        mode: 'cors',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
        }).then(function (response) {
            response.json().then(function(data) {
              if(response.status===200){
               localStorage.clear();
               console.log(data);
               console.log(data['result']['login']);

               setLoginButtonName(data['result']['login']);
               localStorage.setItem('profile', data['result']['login']);
               localStorage.setItem(data['result']['login'], data['result']['_id']);
               }
        });
       })

    }

    document.getElementsByName("email")[0].value="";
    document.getElementsByName("password")[0].value="";

    setForm(initialState);

  };

const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

  };

/*const showPassword = (e) => {
    e.preventDefault();

  };

const handleShowPassword = (e) => {
    e.preventDefault();

  };*/

const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

const closeAuthMenu=()=>{
  let loginBtnName = localStorage.getItem("profile") ? localStorage.getItem("profile") : "Войти";
  setLoginButtonName(loginBtnName);

  setShowAuth(false);

  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className="paper" elevation={3}>
      <span className="close" onClick={closeAuthMenu} >&times;</span>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className="form" onSubmit={handleSubmit}>

           <Grid container spacing={2}>

            { isSignup && (
            <>
              <Input id="login" name="login" label="логин" handleChange={handleChange}  />
            </>
            )}
            <Input id="email" name="email" label="email" handleChange={handleChange} type="email" />
            <Input id="password" name="password" label="пароль"  handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}  />
            { isSignup && <Input id="confirm-password" name="confirmPassword" label="повторите пароль" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className="sign-button">
            { isSignup ? 'Зарегистрироваться' : 'Войти' }
          </Button>
          <Button fullWidth className="sign-button" variant="contained" color="primary" onClick={switchMode}>
                { isSignup ? 'Есть аккаунт? Войти' : "Регистрация" }
              </Button>
          <Grid container justify="flex-end">
            <Grid item>

            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;

/*const handleSubmit = (e, form) => {
    e.preventDefault();

    if (isSignup) {
      fetch('http://localhost:3000/signup', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(form)
      })
    } else {
      fetch('http://localhost:3000/signin', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(form)
      })
    }

  };*/