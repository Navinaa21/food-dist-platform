import React from "react";
import axios from "axios";
import "./View.css";
import FoodCard from "./Foodcard.jsx";
import { useState,useEffect } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function View() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };
    const year = new Date().getFullYear();
    axios.defaults.withCredentials=true;


    const navigate=useNavigate();
    // useEffect(()=>{
    //     axios.get('https://food-dist-platform.onrender.com/View')
    //     .then(res=>{
    //         if(res.data.valid){
    //             console.log('success');
    //         }else{
    //             navigate('/login')
    //         }
    //     })
    //     .catch(err=> console.log(err))
    //   })


    const handleLogout = () => {
        axios.get('https://food-dist-platform.onrender.com/logout')
        .then(() => {
                navigate('/login');
        })
        .catch(err => console.log(err));
    };




    const handleReload = () => {
        // Use navigate to reload the current page
        
        navigate('/', { replace: true });
        window.location.reload();
    };



    const [data,setData]=useState([]);
    useEffect(() => {
        const role = localStorage.getItem('role');
        axios.get('https://food-dist-platform.onrender.com/fetchata',{ params: { role } })
        .then(res => {
                if (res.data.success) {
                    setData(res.data.data);
                } else {
                    console.log(res.data.error);
                    // Handle unauthorized access or other errors
                }
        })
        .catch(err => console.log(err));
    }, []);



    const handlebuy = (foodName, email) => {

        console.log(foodName);
        const role = localStorage.getItem('role');
        axios.delete(`https://food-dist-platform.onrender.com/Buy/${foodName}?email=${email}`,{ params: { role } })
          .then(res => {
            console.log('Item deleted successfully');
            toast.success("Success Notification !");
      
            // Delay the reload by 1 second (adjust the time as needed)
            setTimeout(() => {
              window.location.reload();
            }, 4000);
          })
          .catch(err => console.log(err));
          
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
                <button onClick={handleLogout} className="sig-btn">Logout</button>
            </div>
        </div>
        <div className="av">
            <h2>AVAILABLE FOODS</h2>
        </div>
        
        <div className="body-content1">

            <div className="org">
                {data.map( (d,i)=>(

                    <FoodCard
                    key={i}
                    image={`https://food-dist-platform.onrender.com/images/`+d.image}
                    foodName={d.foodname}
                    donorName={d.donor}
                    contact={d.contact}
                    location={d.location}
                    quantity={d.quantity}
                    email={d.email}
                    foodType={d.foodtype}
                    condition={d.condition}
                    onDelete={handlebuy}
                    />
                    

                ))}
            </div>
            
            
           
            
        </div>

                    

        <div className="footer">
            <h3>Copyright ⓒ {year}</h3>
        </div>
      </div>
    );
  }
  
  export default View;
