import React, {useState} from 'react';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';

const Register = (props) => {
    const [userNameReg, setUserNameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [confirmPasswordReg, setConfirmPasswordReg] = useState('');
    const history = useHistory();

    // Sets a new user's coins balance to 500
    const setNewUserCoins = () => {
        props.setUserCoins(500);
        setTimeout(console.log(props.coins), 1000)
    }

    const registerUser = (event) => {
        event.preventDefault();
        setNewUserCoins();
        if (userNameReg !== '' && passwordReg !== '' && passwordReg === confirmPasswordReg) {
            Axios.post('http://localhost:5000/user', {
                userName: userNameReg, 
                password: passwordReg,
                coins: props.coins
            }).then((response) => {
                console.log(response);
            });
            history.push('/home')
            props.setUsersName(userNameReg);
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

    return (
        <div>
            <form onSubmit={registerUser}>
                <div className='form-group'>
                    <label className='font-weight-bold'>User Name</label>
                    <input 
                    type='text' 
                    className='form-control' 
                    id='userName'
                    onChange={(e) => {
                        setUserNameReg(e.target.value);
                    }}></input>
                </div>
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
                    className='btn btn-primary' 
                    type='submit' 
                    value='Log in'></input>
            </form>
        </div>
    )
}

export default Register;