import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
{/* 
    dummy code for cardetailspage*/}
const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/cars/${id}`)
      .then((response) => {
        if (response.data.message === "Car not found") {
          setCar(null);
        } else {
          setCar(response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching car details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading car details...</p>;
  if (!car) return <p>No car found. Please add a car first.</p>;

  return (
    <div>
      {/* Left Section: Make/Model, Reviews, Specs, Rent Button */}
      <div>
        <h1>
          {car.make} {car.model}
        </h1>
        <p>
          ⭐ {car.rating ? car.rating.toFixed(1) : "No rating yet"} (
          {car.total_reviews} reviews)
        </p>

        <div>
          <p>
            <b>Transmission:</b> {car.transmission}
          </p>
          <p>
            <b>Passengers:</b> {car.passengers || "N/A"}
          </p>
          <p>
            <b>Air Conditioning:</b> {car.air_conditioning ? "Yes" : "No"}
          </p>
          <p>
            <b>Doors:</b> {car.doors || "N/A"}
          </p>
        </div>

        <button>Rent Now</button>
      </div>

      {/* Right Section: Vehicle Details */}
      <div>
        <h3>Vehicle Details</h3>
        <p>
          <b>Owner:</b> {car.owner_name}
        </p>
        <p>
          <b>VIN:</b> {car.vin}
        </p>
        <p>
          <b>Year of Manufacture:</b> {car.year_of_manufacture}
        </p>
        <p>
          <b>Fuel Type:</b> {car.fuel_type}
        </p>
        <p>
          <b>Availability:</b> {car.availability_status}
        </p>
        <p>
          <b>Vehicle Number:</b> {car.registration_number}
        </p>

        <h3>Additional Information</h3>
        <p>
          <b>Price Per Day:</b> ${car.price_per_day}
        </p>
      </div>
    </div>
  );
};

export default CarDetailsPage;
