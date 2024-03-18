import React from "react";
import "./Add.css";
import FoodCard2 from "./Foodcard2.jsx";
import { useState,useEffect } from "react";
import axios from "axios";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
function Add() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const year = new Date().getFullYear();
    useEffect(() => {
        axios.get('http://localhost:8081/Add')
            .then(res => {
                if (res.data.valid) {
                    console.log('success');
                } else {
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));
    });


    const navigate=useNavigate();
  
    axios.defaults.withCredentials=true;

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





    const [image, setimage] = useState('');
    const [donor, setdonor] = useState('');
    const [foodname, setfoodname] = useState('');
    const [email, setemail] = useState('');
    const [quantity, setquantity] = useState('');
    const [condition, setcondition] = useState('');
    const [foodtype, setfoodtype] = useState('');
    const [contact, setcontact] = useState('');
    const [location, setlocation] = useState('');
    
    

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const formData = new FormData();
    
        formData.append('image', image);
    
        formData.append('donor', donor);
        formData.append('foodname', foodname);
        formData.append('email', email);
        formData.append('quantity', quantity);
        formData.append('condition', condition);
        formData.append('foodtype', foodtype);
        formData.append('contact', contact);
        formData.append('location', location);
    
        axios.post('http://localhost:8081/Add', formData)
            .then(res => {
                navigate('/Add');
                window.location.reload();
            })
            .catch(err => console.log(err));
    };
    
    
    
    const [data,setData]=useState([]);
    

    useEffect(() => {
        axios.get('http://localhost:8081/getData')
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
    



    const handleDelete = (foodName) => {
        console.log(foodName)
        axios.delete(`http://localhost:8081/Delete/${foodName}`)
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
        

        <form action="" onSubmit={handleSubmit}>
            <div className="card-container">
                <div className="body-content">
                        <div className="input-box">
                            <label>Image Details:</label>
                            <input onChange={(e) => setimage(e.target.files[0])}
                                type="file"
                                id="imageInput"
                                accept="image/*"
                            />
                        </div>
                        <div className="input-box">
                            <label>Food Name:</label>
                            <input type="text" placeholder="Enter food name" onChange={e => setfoodname(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <label>Donor Name:</label>
                            <input type="text" placeholder="Enter name" onChange={e => setdonor(e.target.value)}/>
                        </div>
                        <div className="input-box">
                            <label>Email:</label>
                            <input type="email" placeholder="Enter email" onChange={e => setemail(e.target.value)}/>
                        </div>
                        <div className="input-box">
                            <label>Quantity:</label>
                            <input type="text" placeholder="Enter quantity" onChange={e => setquantity(e.target.value)}/>
                        </div>
                        <div className="input-box">
                            <label>Condition:</label>
                            <input type="text" placeholder="Enter condition" onChange={e => setcondition(e.target.value)}/>
                        </div>
                        <div className="input-box">
                            <label>Food Type:</label>
                            <input type="text" placeholder="Enter food type" onChange={e => setfoodtype(e.target.value)}/>
                        </div>
                        <div className="input-box">
                            <label>Contact</label>
                            <input type="text" placeholder="Enter Contact" onChange={e => setcontact(e.target.value)}/>
                        </div>
                        <div className="input-box">
                            <label>location</label>
                            <input type="text" placeholder="Enter location" onChange={e => setlocation(e.target.value)}/>
                        </div>
                    
                </div>
                <button className="add-btn">Submit</button>
            </div>
        </form>
        <div className="body-content1">
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
                onDelete={handleDelete}
                />

            ))}
            
            
            
            
        </div>



        <div className="footer">
            <h3>Copyright ⓒ {year}</h3>
        </div>
      </div>
    );
  }
  
  export default Add;