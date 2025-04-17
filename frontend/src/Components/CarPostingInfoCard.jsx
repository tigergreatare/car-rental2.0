import { useState } from "react";



export default function PostingInfoForm() {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    rentalTerms: "",
    carDetails: "",
    phone: "",
    address: "",
    makeModel: "",
    yearOfManufacture: "",
    vin: "",
    mileage: "",
    transmission: "",
    color:"",
    fuelType: "",
    rentalPrice: "",
    securityDeposit: "",
    insuranceCoverage: "",
    paymentMethods: "",
    latefee:"",
    pickupLocation: "",
    fuelPolicy:""
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic (API call, etc.)
  };

  return (
    <div className="max-w-lg mx-auto p-6 shadow-lg rounded-2xl border">
      <div className="postingcar">
        <h2 className="text-xl font-bold mb-4">Post Rental Info</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="personal-info">
            <h1>Personal Info</h1>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your fullname" required />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" required />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter address" required />
          </div>
  
           
        
          <div className="image-section">
          
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
          </div>
          <div className="rental-terms">
            <textarea name="rentalTerms" value={formData.rentalTerms} onChange={handleChange} placeholder="Enter rental terms" required />
            <input type="text" name="rentalPrice" value={formData.rentalPrice} onChange={handleChange} placeholder="Enter rental price" required />
            <input type="text" name="securityDeposit" value={formData.securityDeposit} onChange={handleChange} placeholder="Enter security deposit amount" required />
            <input type="text" name="securityDeposit" value={formData.insuranceCoverage} onChange={handleChange} placeholder="Enter security deposit amount" required />
            <input type="text" name="securityDeposit" value={formData.fuelPolicy} onChange={handleChange} placeholder="Enter security deposit amount" required />

          </div>
          <div className="car-details">
   
            <textarea name="carDetails" value={formData.carDetails} onChange={handleChange} placeholder="Enter car details" required />
            <input type="text" name="makeModel" value={formData.makeModel} onChange={handleChange} placeholder="Enter makeModel " required />
            <input type="text" name="yearOfManufacture" value={formData.yearOfManufacture} onChange={handleChange} placeholder="Enter yearOfManufacture" required />
            <input type="text" name="vin" value={formData.vin} onChange={handleChange} placeholder="Enter vin" required />
            <input type="text" name="mileage" value={formData.mileage} onChange={handleChange} placeholder="Enter mileage" required />
            <input type="text" name="transmission" value={formData.transmission} onChange={handleChange} placeholder="Enter transmission" required />
            <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="Enter type of color" required />
            <input type="text" name="fuelType" value={formData.fuelType} onChange={handleChange} placeholder="Enter fuelType" required />
          </div>
         
          <div className="payment-details">
          <input type="text" name="paymentMethods" value={formData.paymentMethods} onChange={handleChange} placeholder="Enter paymentMethods" required />
          <input type="text" name="latefee" value={formData.latefee} onChange={handleChange} placeholder="Enter late fee" required />
          </div>

          <div className="additional-requirements">
            <input type="text" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} placeholder="Enter pickup location" required />
          </div>
          <button type="submit" className="w-full flex items-center gap-2">
            <upload size={16} /> Post Info
          </button>
        </form>
      </div>
    </div>
  );
}
