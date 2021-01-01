import React, {useState} from 'react';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';
import '../CSS/styles.css';

const Register = (props) => {
    const [userNameReg, setUserNameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [confirmPasswordReg, setConfirmPasswordReg] = useState('');
    const history = useHistory();

    // Sets a new user's coins balance to 500
    const setNewUserCoins = () => {
        props.setUserCoins(500);
    }

    // When the username has been verfied to be original the user can 
    // enter a password and then that account will be registered in the db
    const registerUser = (event) => {
        event.preventDefault();
        setNewUserCoins();
        let validCredentials = checkValidCredentials();
        if (validCredentials === true) {
            Axios.post('http://localhost:5000/user', {
                userName: userNameReg, 
                password: passwordReg,
                coins: 500
            }).then((response) => {
                console.log(response.data.userName);
                localStorage.setItem('user', response.data.userName);
            });
            history.push('/home')
            props.setUsersName(userNameReg);
        }
    }

    // This function checks if the username that the
    // user entered exists or not
    const checkUsername = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:5000/username', {
            userName: userNameReg
        }).then((res) => {
            let existingUserName = userNameExists(res);
            if (existingUserName) {
                alert('User Name Already Exists. Please Enter a Different One');
            }
            else {
                swapForms();
            }
        }).catch((err) => {
            console.log(err);
        });
        
    }

    // This function checks if the response data array has any data or no
    const userNameExists = (res) => {
        if (res.data[0]) {
            // Username already exists, user can't use that name
            return true
        }
        else {
            // Username does not exist, the user can use that name
            return false;
        }
    }

    // THis function checks that the userName isn't blank and the user's passwords
    // are the same
    const checkValidCredentials = () => {
        if (userNameReg !== '' && passwordReg !== '' && passwordReg === confirmPasswordReg) {
            return true;
        }
        else {
            if (userNameReg === '') {
                alert('Please Enter a Valid User Name');
            }
            else if (passwordReg === '') {
                alert('Please Enter a Valid Password');
            }
            else {
                alert('Please Enter the Same Passwords');
            }
        }
    }

    // This function makes the userName form invisible and makes the 
    // password form visible when the password has been cleared to be available
    const swapForms = () => {
        document.getElementById('userNameForm').style = 'visibility: hidden';
        document.getElementById('userPasswordForm').style = 'visibility: visible';
    }

    return (
        <div className='register-form'>
            <form id='userNameForm' onSubmit={checkUsername}>
                <div className='form-group'>
                    <label className='font-weight-bold'>Enter a User Name</label>
                    <input 
                    type='text' 
                    className='form-control' 
                    id='userName'
                    onChange={(e) => {
                        setUserNameReg(e.target.value);
                    }}></input>
                    <input 
                    className='mt-3 btn btn-primary btn-block' 
                    type='submit' 
                    value='Enter'></input>
                </div>
            </form>
            <form id='userPasswordForm' style={{visibility: 'hidden'}} onSubmit={registerUser}>
                <div className='form-group'>
                    <label className='font-weight-bold'>Password</label>
                    <input 
                    type='password' 
                    className='form-control'
                    onChange={(e) => {
                        setPasswordReg(e.target.value)
                    }}></input>
                </div>
                <div className='form-group'>
                    <label className='font-weight-bold'>Confirm Password</label>
                    <input 
                    type='password' 
                    className='form-control'
                    onChange={(e) => {
                        setConfirmPasswordReg(e.target.value)
                    }}></input>
                </div>
                    <input 
                    className='btn btn-primary btn-block' 
                    type='submit' 
                    value='Log in'></input>
            </form>
        </div>
    )
}

export default Register;