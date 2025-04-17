import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CarContainer() {
  const [cars, setCars] = useState([]);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate(); // Hook to navigate to another route

  // Fetch car data
  useEffect(() => {
    axios
      .get("http://localhost:5000/cars")
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.log("Error fetching car data:", error);
      });
  }, []);

  // Fetch review data (only once)
  useEffect(() => {
    axios
      .get("http://localhost:5000/reviews")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.log("Error fetching review data:", error);
      });
  }, []);

  const handleRentClick = (carId) => {
    // Navigate to the car detail page
    navigate(`/car/${carId}/payment`);
  };

  return (
    <div className="car-container">
      {cars.map((carItem) => (
        <div key={carItem.car_id} className="car-detail">
          <div className="car-detail-left">
            <img
              src={carItem.car_image || "default-car.jpg"}
              alt={carItem.make}
              className="rounded-t-2xl"
            />
            <h1>
              {carItem.make} {carItem.model} ({carItem.year_of_manufacture})
            </h1>
            <p>Color: {carItem.color}</p>
            <p>Mileage: {carItem.current_mileage} km</p>
            <p>Fuel Type: {carItem.fuel_type}</p>
            <p>Transmission: {carItem.transmission}</p>
            <p>Status: {carItem.status}</p>
            <p className="price">${carItem.price_per_day} / day</p>

            <button onClick={() => handleRentClick(carItem.car_id)}>Rent Now</button>
          </div>

          {/* Review Section */}
          <div className="car-review">
            {reviews
              .filter((review) => review.car_id === carItem.car_id) // Filter reviews by car_id
              .map((review) => (
                <div key={review.review_id} className="carcontainer-review">
                  <p>👤{review.review_name}</p>
                  <p>Rating: {review.rating}</p>
                  <p>{review.review_text}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
