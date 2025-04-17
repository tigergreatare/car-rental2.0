import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "../css/CarCard.css"

export default function CarCard() {
  const [carData, setCarData] = useState([]);
  const [reviews, setReviews] = useState({});
  const navigate = useNavigate(); // Store reviews for each car

  // Fetch car data
  useEffect(() => {
    axios
      .get("http://localhost:5000/cars")  // Ensure API URL matches your backend
      .then((response) => {
        setCarData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching car data:", error);
      });
  }, []);

  // Handle Rent Button Click
  function handleRentClick(carId) {
    // Navigate to /cardetail with carId as a URL parameter
    navigate(`/cardetail/${carId}`);
  }

  // Handle Review Submission
  function handleReviewSubmit(event, carId) {
    event.preventDefault();
    const reviewText = event.target.review.value.trim();

    if (reviewText) {
      setReviews((prevReviews) => ({
        ...prevReviews,
        [carId]: [...(prevReviews[carId] || []), reviewText],
      }));
      event.target.reset();
    }
  }

  // Handle Review Deletion
  function handleDeleteReview(carId, reviewIndex) {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [carId]: prevReviews[carId].filter((_, index) => index !== reviewIndex),
    }));
  }

  return (
    <div className="car-container">
      {carData.map((carItem) => (
        <div key={carItem.car_id} className="car-card"> {/* Unique key for car card */}
          <img src={carItem.car_image || "default-car.jpg"} alt={carItem.make} className="rounded-t-2xl" />
          <div className="CarContent">
            <h1>{carItem.make} {carItem.model} ({carItem.year_of_manufacture})</h1>
            <p>Color: {carItem.color}</p>
            <p>Mileage: {carItem.current_mileage} km</p>
            <p>Fuel Type: {carItem.fuel_type}</p>
            <p>Transmission: {carItem.transmission}</p>
            <p>Status: {carItem.status}</p>
            <p className="price">${carItem.price_per_day} / day</p>
            <button onClick={() => handleRentClick(carItem.car_id)}>Rent Now</button>
          </div>

          {/* Review Section */}
          <div className="review">
            <h2>Reviews</h2>
            <form onSubmit={(event) => handleReviewSubmit(event, carItem.car_id)}>
              <input
                type="text"
                name="review"
                placeholder="Write a review..."
                className="w-full border rounded-lg px-3 py-1 focus:outline-none focus:ring focus:ring-lime-500"
              />
              <button
                type="submit"
                className="w-full bg-lime-600 text-white py-1 rounded-lg hover:bg-lime-700 transition"
              >
                Submit Review
              </button>
            </form>

            {/* Display Reviews */}
            <ul className="">
              {(reviews[carItem.car_id] || []).map((review, index) => (
                <li key={`${carItem.car_id}-${index}`} className="border p-2 rounded-md bg-gray-100 flex justify-between items-center">
                  <span>{review}</span>
                  <button 
                    onClick={() => handleDeleteReview(carItem.car_id, index)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
