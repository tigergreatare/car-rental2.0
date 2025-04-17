import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

export default function CarDetailPage() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Access cart functions
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("http://localhost:5000/cars")
      .then((response) => {
        const foundCar = response.data.find(
          (item) => item.car_id === Number(carId)
        );
        setCar(foundCar);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching car details:", err);
        setError("Error fetching car details");
        setLoading(false);
      });
  }, [carId]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/reviews")
      .then((response) => setReviews(response.data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  if (loading) return <div>Loading car details...</div>;
  if (error) return <div>{error}</div>;
  if (!car) return <div>No car found.</div>;

  // Build the cart-item object once
  const carToCart = {
    id: car.car_id,
    make: car.make,
    model: car.model,
    year: car.year_of_manufacture,
    price: car.price_per_day,
    image: car.car_image,
  };

  function handleRentClick() {
    // 1) add to cart
    addToCart(carToCart);
    // 2) navigate to payment
    navigate(`/cardetail/${carId}/payment`);
  }

  function handleAddToCart() {
    addToCart(carToCart);
  }

  return (
    <div className="car-detail-page">
      <div className="car-detail-container">
        <img
          src={car.car_image || "default-car.jpg"}
          alt={`${car.make} ${car.model}`}
          style={{
            width: "300px",
            height: "auto",
            objectFit: "cover",
            borderRadius: "6px",
          }}
        />
        <h1>{car.make} {car.model} ({car.year_of_manufacture})</h1>
        <p>Color: {car.color}</p>
        <p>Mileage: {car.current_mileage} km</p>
        <p>Fuel Type: {car.fuel_type}</p>
        <p>Transmission: {car.transmission}</p>
        <p>Status: {car.status}</p>
        <p className="price">${car.price_per_day} / day</p>
        
        <button onClick={handleRentClick} style={{ marginRight: "0.5rem" }}>
          Rent Now
        </button>
        <button onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>

      <div className="car-review">
        {reviews
          .filter((rev) => rev.car_id === car.car_id)
          .map((rev) => (
            <div key={rev.review_id} className="carcontainer-review">
              <p>👤 {rev.review_name}</p>
              <p>Rating: {rev.rating}</p>
              <p>{rev.review_text}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

