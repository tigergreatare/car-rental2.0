import { Link } from "react-router-dom";
import {useState} from "react";
import "../css/Navbar.css";
import { FaSearch } from "react-icons/fa"; // import search icon


export default function Navbar() {
    const [searchCar, setSearchCar]= useState("");


  const handleSearch = (e) => {
    e.preventDefault();
    alert(searchCar);
    setSearchCar("")
  };
  return (
    <div className="navbar">
      <h1>BookMyCar🚗</h1>
      <div className="search-bar">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for a car..."
            className="search-input"
            value={searchCar}
            onChange={(e)=> setSearchCar(e.target.value)}
          />
           <button type="submit" className="search-button">
          <FaSearch/>
        </button>
        </form>
       
      </div>
      <nav className="navbar-inside">
        <div className="car-home">
          <Link to="/">Home🏠</Link>
        </div>
        <div className="car-about">
          <Link to="/signin">SignIn🔑</Link>
        </div>
        <div className="car-rent">
          <Link to="/Post-car">Post car🚗</Link>
        </div> 
        <div className="car-book">
          <Link to="/profile">Profile👤</Link>
        </div>
        <div className="car-contact">
          <Link to="/chat">Chat✉️</Link>
        </div>
        <div className="car-contact">
          <Link to="/Shopping-cart">Shopping cart🛒</Link>
        </div>
      </nav>
    </div>
  );
}
