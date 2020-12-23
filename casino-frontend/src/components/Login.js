import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';


const Login = (props) => {
    const history = useHistory();
    const [usersName, setUsersName] = useState('');
    const [usersPassword, setUsersPassword] = useState('');

    const loginUser = (event) => {
        event.preventDefault();
        if (usersName === '' || usersPassword === '') {
            alert('Please Enter Your Full Credentials');
        }
        else {
            Axios.post('http://localhost:5000/login', {
                userName: usersName,
                password: usersPassword 
            }).then((res) => {
                if (res.data.length !== 0) {
                    history.push('/home')
                    props.setUsersName(usersName);
                    props.setUserCoins(res.data[0].coins);
                    console.log(res.data[0].userName);
                    localStorage.setItem('user', res.data[0].userName);
                }
                else {
                    alert('Wrong User Name/Password')
                }
            })
        }
    }

    return (
        <div className='border p-2 ml-5 mr-5 mt-5'>
            <form>
                <h3>Login</h3>
                <div className='form-group'>
                    <label 
                    htmlFor='userName' 
                    className='font-weight-bold'
                    >User Name</label>
                    <input 
                    type='text' 
                    className='form-control' 
                    id='userName'
                    onChange={(e) => {
                        setUsersName(e.target.value)
                    }}></input>
                </div>
                <div className='form-group'>
                    <label 
                    htmlFor='userPassword' 
                    className='font-weight-bold'>Password</label>
                    <input type='password' 
                    className='form-control'
                    onChange={(e) => {
                        setUsersPassword(e.target.value)
                    }}></input>
                </div>
                <button 
                className='btn btn-primary'
                onClick={loginUser} 
                >Log In</button>
            </form>
            <div>
                <Link to='/register'>Create New Account</Link><br></br>
                <Link to='/home' 
                onClick={() => 
                    {localStorage.setItem('user', 'Guest');
                    props.setUsersName('Guest');
                    Axios.post('http://localhost:5000/username', {
                        userName: 'Guest'
                    }).then((res) => {
                        props.setUserCoins(res.data[0].coins);
                    })}}
                >
                Continue as Guest
                </Link>
            </div>
        </div>
    )
}

export default Login;