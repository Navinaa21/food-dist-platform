import React from "react";
import "./Signup.css";
import axios from 'axios';
import Vaalidation from "./SignupValidation.jsx";
import {Link, useNavigate} from 'react-router-dom';
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
function Signup() {
    const navigate= useNavigate();
    const[values,setValues]=useState({
        role:'',
        email:'',
        password:''
    })
    const [errors,setErrors]=useState({})
    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log('Submit button clicked');
        setErrors(Vaalidation(values));
        if(errors.email==="" && errors.password===""){
            console.log('Submit button clicked', values);
            axios.post('http://localhost:8081/signup', values)
           
            .then(res=> {
                navigate('/login');
            }).catch(err=> console.log(err))
        }
    }
    const handleInput=(event)=>{
        setValues(prev=>({...prev,[event.target.name]: [event.target.value]}))
    }


    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const year = new Date().getFullYear();


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
                <button onClick={handleReload2} className="sig-btn">Sign in</button>
            </div>
        </div>
        <div className="sig-area">
            <form action="" onSubmit={handleSubmit}>
                <h3 className="ye">Sign Up</h3>
                <div className="drop">
                    <select name="role" onChange={handleInput}>
                        <option>--role--</option>
                        <option>Buyer</option>
                        <option>Donor</option>
                        
                    </select>
                </div>
                <div>
                    <input type="email" placeholder="Email" name="email" onChange={handleInput}/>
                    {errors.email && <span className="text-danger">{errors.email}</span>}
                </div>
                <div>
                    <input type="password" placeholder="Password" name="password" onChange={handleInput}/>
                    {errors.password && <span className="text-danger">{errors.password}</span>}
                </div>
                <Link to="/login">
                    <p className="ye">Already have an account?</p>
                </Link>
                <div>
                    <button type="submit">Sign up</button>
                </div>
            </form>
        </div>




        <div className="footer1">
            <h3>Copyright ⓒ {year}</h3>
        </div>
      </div>
    );
  }
  
  export default Signup;