import React from "react";
import axios from "axios";
import "./View.css";
import FoodCard2 from "./Foodcard2.jsx";
import { useState,useEffect } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";


function Admin() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };
    const year = new Date().getFullYear();
    axios.defaults.withCredentials=true;


    const navigate=useNavigate();
    useEffect(()=>{
        axios.get('http://localhost:8081/Admin')
        .then(res=>{
            if(res.data.valid){
                console.log('success');
            }else{
                navigate('/login')
            }
        })
        .catch(err=> console.log(err))
      })


    const handleLogout = () => {
        axios.get('http://localhost:8081/logout')
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
        axios.get('http://localhost:8081/fetchata')
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
        console.log(foodName)
        axios.delete(`http://localhost:8081/Buy/${foodName}?email=${email}`)
        .then(res => {
            window.location.reload();
            
            console.log('Item deleted successfully');
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

                    <FoodCard2
                    key={i}
                    image={`http://localhost:8081/images/`+d.image}
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
  
  export default Admin;