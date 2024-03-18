import React from "react";
import { useState,useEffect } from "react";
import "./Home.css";
import MenuIcon from '@mui/icons-material/Menu';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useNavigate} from 'react-router-dom';


function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useEffect(() => {
      AOS.init({duration:1000});
    }, [])
    

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const year = new Date().getFullYear();



  const navigate = useNavigate();
  
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
          <button onClick={handleReload2} className="sig-btn">Sign up</button>
        </div>
      </div>
      <div className="top">
        <img src="/images/f1.png" alt=""/>
        <h1>Together, Let's Make a Difference</h1>
        <h2>Join us in leveraging technology for a more efficient, transparent, and compassionate approach to food redistribution on a global scale</h2>
      </div>
      <div className="mid">
        <div data-aos="fade-right"  className="cont">
          <h2>By connecting surplus food with those in need, GFRN addresses critical global issues, including hunger, environmental sustainability, and community support.</h2>
        </div>
        <img src="/images/food3.png" alt=""/>
        <div data-aos="fade-left"className="cont2">
          <h1>Register now and be part of the solution!</h1>
          <h2>Together, we can create a world where no one is left behind.</h2>
        </div>
        <img src="/images/food2.png" alt="" className="foodimg"/>
        <div data-aos="fade-right" className="cont">
          <h2>Effortlessly create detailed listings for surplus food. Showcase the type and quantity of available items with the option to upload images and provide additional details.</h2>
        </div>
        <img src="/images/food4.jpg" alt=""/>
        <div data-aos="fade-left" className="cont2">
          <h2>Stay informed with real-time updates on available surplus food and successful redistributions.</h2>
        </div>
        <img src="/images/food1.jpg" alt="" className="fooim"/>
      </div>
      <div className="footer">
        <h3>Copyright ⓒ {year}</h3>
      </div>
    </div>
    
  );
}

export default Home;
