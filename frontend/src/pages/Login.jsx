import React from "react";
import "./Login.css";
import axios from 'axios';
import Validation from './LoginValidation.jsx';
import { useState,useEffect } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import {Link, useNavigate} from 'react-router-dom';

function Login() {
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({});
    const navigate=useNavigate();
    const handleSubmit=(event)=>{
        event.preventDefault();
        if(values.email && values.password && Object.keys(errors).length === 0){
            console.log('Submit button clicked', values);
            axios.post('https://food-dist-platform.onrender.com/login', values)
            .then(res=> {
                console.log(res.data.role);
                console.log(res.data.session);
                if (res.data.login ){
                    if (res.data.role === 'Buyer') {
                        navigate('/View');
                    } else if (res.data.role === 'Donor') {
                        navigate('/Add');
                    } else if(res.data.role === 'Admin'){
                        navigate('/Admin');
                    }
                    else {
                        alert("Invalid role");
                    }
                }else{
                    alert("No record existed");
                }
            }).catch(err=> console.log(err))
        }
    }
    const handleInput=(event)=>{
        setValues(prev=>({...prev,[event.target.name]: [event.target.value]}));
    }
    axios.defaults.withCredentials=true;
    useEffect(()=>{
        axios.get('https://food-dist-platform.onrender.com/View')
        .then(res=>{
            if(res.data.valid){
                navigate('/View')
            }else{
                navigate('/login')
            }
        })
        .catch(err=> console.log(err))
    },[navigate])
    useEffect(()=>{
        axios.get('https://food-dist-platform.onrender.com/Add')
        .then(res=>{
            if(res.data.valid){
                navigate('/Add');
            }else{
                navigate('/login');
            }
        })
        .catch(err=> console.log(err))
    },[navigate])


    useEffect(()=>{
        axios.get('https://food-dist-platform.onrender.com/Admin')
        .then(res=>{
            if(res.data.valid){
                navigate('/Admin');
            }else{
                navigate('/login');
            }
        })
        .catch(err=> console.log(err))
    },[navigate])

    const handleReload = () => {
        // Use navigate to reload the current page
        
        navigate('/', { replace: true });
        window.location.reload();
    };
    const handleReload1 = () => {
        // Use navigate to reload the current page
        
        navigate('/login', { replace: true });
        window.location.reload();
    };
    const handleReload2 = () => {
        // Use navigate to reload the current page
        
        navigate('/signup', { replace: true });
        window.location.reload();
    };



    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const year = new Date().getFullYear();
    return (
      <div>
        <div className="home-container">
            <div className="menu">
                <button className="menu-btn" onClick={toggleMenu}>
                    <MenuIcon/>
                </button>
                {isMenuOpen && (
                    <div className="dropdown">
                        <button className="menu-item">Contact</button>
                        <button onClick={handleReload} className="menu-item">About Us</button>
                    </div>
                )}
            </div>
            <div className="tit">
                <h2 onClick={handleReload}><img src="/images/f3.png" alt=""/>FOOD NETWORK</h2>
            </div>
            <div className="buttons-container">
                <button onClick={handleReload1} className="log-btn">Login</button>
                <button onClick={handleReload2} className="sig-btn">Sign up</button>
            </div>
        </div>
        <div className="sig-area">
            <h3>Login</h3>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <input type="email" placeholder="Email" name='email' onChange={handleInput}/>
                    {errors.email && <span className="text-danger">{errors.email}</span>}
                </div>
                <div>
                    <input type="password" placeholder="Password" name='password' onChange={handleInput}/>
                    {errors.password && <span className="text-danger">{errors.password}</span>}
                </div>
                <Link to="/signup" className="para">New User? Create an account</Link>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
        <div className="footer1">
            <h3>Copyright ⓒ {year}</h3>
        </div>
      </div>
    );
  }
  
  export default Login;
