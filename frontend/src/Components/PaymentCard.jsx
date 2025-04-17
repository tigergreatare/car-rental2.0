import  { useState } from "react";
import axios from "axios";
import '../css/Payment.css';

export default function PaymentForm()  {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    cardType: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/payment", formData);
      alert("Payment successful!");
      console.log(response.data);
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1 className="main_head">Payment Form</h1>
        <hr />

        <h2>Contact Information</h2>
        <p>
          Name:{" "}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          Address:
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="8"
          ></textarea>
        </p>

        <p>
          Email:{" "}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </p>

        <hr />

        <h2>Payment Information</h2>
        <p>
          Card Type:
          <select
            name="cardType"
            value={formData.cardType}
            onChange={handleChange}
          >
            <option value="">--Select a Card Type--</option>
            <option value="visa">Visa</option>
            <option value="mastercard">Mastercard</option>
          </select>
        </p>

        <p>
          Card Number:{" "}
          <input
            type="number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
          />
        </p>
        <p>
          Expiration Date:{" "}
          <input
            type="date"
            name="expDate"
            value={formData.expDate}
            onChange={handleChange}
          />
        </p>
        <p>
          CVV:{" "}
          <input
            type="password"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
          />
        </p>

        <input type="submit" value="Pay Now" className="btn" />
      </form>
    </div>
  );
};

