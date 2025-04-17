import CarCard from "../Components/CarCard";

import "../css/HomePage.css";
export default function HomePage() {
  return (
    <div className="homepage">
      <div className="header">
    
      
      </div>
      {/**
       * useEffect explanation
       * useEffect(()=>{}, [] )
       * ()=>{} this is function which runs if states changes
       * []  object/lists to change
       */}
      {/*       car-listings           */}
      <div className="car-listing">
        <section className="car-header">
          <p className="car-para">Popular Products of the month</p>
          <h1>Most popular car rental deals</h1>
          <div className="car-card">
            <CarCard />
          </div>
        </section>
      </div>
    </div>
  );
}

